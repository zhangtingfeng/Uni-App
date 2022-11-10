using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Mvc;
using CMS.Web.dto;
using DTcms.BLL;
using DTcms.Common;

namespace CMS.Web.Controllers
{
    public class BaseController : Controller
    {
        public readonly article_category _categoryBll;
        public readonly article _article;
        protected virtual int _channelId {
            get;
            set;
        }
        public BaseController()
        {
            _categoryBll = new article_category();
            _article = new article();
        }

        #region 网站顶部
        public PartialViewResult Header()
        {
            var dataList = GetMenuList();
            return PartialView("_header", dataList);
        }
        private List<CategoryDTOModel> GetMenuList()
        {
            var menulistCache = CacheHelper.Get<List<CategoryDTOModel>>("cache_menu_list");
            if (menulistCache != null && menulistCache.Any())
            {
                return menulistCache;
            }
            var topCagegoryList = _categoryBll.GetList(0, default(int?));
            var dataList = new List<CategoryDTOModel>();
            topCagegoryList.ForEach((p) =>
            {
                if (p.channel_id != 12)
                {
                    dataList.Add(new CategoryDTOModel()
                    {
                        text = p.title,
                        url = p.link_url,
                        children = GetSubList(p.id, p.channel_id)
                    });
                }
            });
            CacheHelper.Insert("cache_menu_list", dataList);
            return dataList;
        }
        private List<CategoryDTOModel> GetSubList(int parentid, int chanelid)
        {
            if (chanelid == 11) return new List<CategoryDTOModel>();
            var topCagegoryList = _categoryBll.GetList(parentid, default(int?));
            var dataList = new List<CategoryDTOModel>();
            topCagegoryList.ForEach((p) =>
            {
                dataList.Add(new CategoryDTOModel()
                {
                    text = p.title,
                    icon_url = p.img_url,
                    url = p.link_url
                });
            });
            if (!dataList.Any())
            {
                var articleList = _article.GetList(chanelid, 10, "category_id=" + parentid, "sort_id asc");
                foreach (DataRow dataRow in articleList.Tables[0].Rows)
                {
                    dataList.Add(new CategoryDTOModel()
                    {
                        text = dataRow["title"].ToString(),
                        url = chanelid == 8 ? "/product/index.html?id=" + dataRow["id"].ToString() : dataRow["link_url"].ToString()
                    });
                }

            }
            return dataList;
        }
        #endregion

        #region 内容页
        public SinglePageDTOModel GetModel(string callindex = "")
        {
            var single = new SinglePageDTOModel();

            if (!string.IsNullOrEmpty(callindex))
            {
                single.article = _article.GetModel(_channelId, callindex);
            }
            var model = _categoryBll.GetModel(single.article.category_id);
            if (model != null)
            {
                var imgmodel = _categoryBll.GetModel(model.parent_id);
                if (imgmodel != null)
                {
                    single.cover_image_url = imgmodel.img_url;
                }
                else
                {
                    single.cover_image_url = model.img_url;
                }
                single.category_name = model.title;
                single.category_id = model.id;
                single.categorylist = GetSubList(model.parent_id, model.channel_id);
            }
            single.localpath = HttpContext.Request.Url.LocalPath;

            return single;
        }
        public SinglePageDTOModel GetModel(int id)
        {
            var single = new SinglePageDTOModel();
            single.article = _article.GetModel(_channelId,id);
            
            var model = _categoryBll.GetModel(single.article.category_id);
            if (model != null)
            {
                var imgmodel = _categoryBll.GetModel(model.parent_id);
                if (imgmodel != null)
                {
                    single.cover_image_url = imgmodel.img_url;
                }
                else
                {
                    single.cover_image_url = model.img_url;
                }
                single.category_name = model.title;
                single.category_id = model.id;
                single.category_url = model.link_url;
                single.categorylist = GetSubList(model.parent_id, model.channel_id);
            }
            single.preArticle = _article.GetPreModel(model.channel_id,model.id,id);
            single.nextArticle = _article.GetNextModel(model.channel_id, model.id, id);
            single.localpath = HttpContext.Request.Url.LocalPath;

            return single;
        }
        public SinglePageDTOModel GetProductModel(int id)
        {
            var single = new SinglePageDTOModel();
            var model = _categoryBll.GetModel(53);
            if (model != null)
            {
                single.cover_image_url = model.img_url;
                single.category_name = model.title;
                single.category_id = model.id;
                single.category_url = model.link_url;
                single.article = _article.GetModel(_channelId, id);
                single.articlelist = _article.GetListAsync(_channelId, 100, "category_id=" + model.id, "sort_id asc");
            }

            single.localpath = HttpContext.Request.Url.LocalPath;
            return single;
        }
        #endregion

        #region 列表页
        public SinglePageDTOModel GetModelList()
        {
            return GetModelList(default(int?), default(int?));
        }
        public SinglePageDTOModel GetModelList(int? pageIndex, int? pageSize)
        {
            var controllerName = HttpContext.Request.RequestContext.RouteData.Values["Controller"].ToString();
            var actionName = HttpContext.Request.RequestContext.RouteData.Values["Action"].ToString();
            var callindex = string.Format("/{0}/{1}.html", controllerName, actionName);
            var single = new SinglePageDTOModel();

            var model = _categoryBll.GetModel(callindex);
            if (model != null)
            {
                single.cover_image_url = _categoryBll.GetModel(model.parent_id).img_url;
                single.category_name = model.title;
                single.category_id = model.id;
                single.categorylist = GetSubList(model.parent_id, model.channel_id);
                if (pageIndex.HasValue && pageSize.HasValue)
                {
                    single.articlelist = _article.GetListAsync(_channelId, model.id, pageSize.Value, pageIndex.Value, "", "add_time desc", out var recordcount);
                    single.PageIndex = pageIndex;
                    single.PageSize = pageSize;
                    single.TotalRecordCount = recordcount;
                }
                else
                {
                    single.articlelist = _article.GetListAsync(_channelId, 0, "category_id=" + model.id, "sort_id asc");
                }
            }

            single.localpath = HttpContext.Request.Url.LocalPath;

            return single;
        }
        #endregion

        public PartialViewResult Footer()
        {
            var dataList = GetMenuList().Where(p => p.text != "联系我们").ToList();
            return PartialView("_footer", dataList);
        }

    }
}