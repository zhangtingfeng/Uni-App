using System.Web.Mvc;

namespace CMS.Web.Controllers
{
    public class NewsController : BaseController
    {
        protected override int _channelId => 1;
        public ActionResult Company(int? pageindex)
        {
            if (!pageindex.HasValue)
            {
                pageindex = 1;
            }
            var model = GetModelList(pageindex,10);
            return View("index", model);
        }
        public ActionResult Industry(int? pageindex)
        {
            if (!pageindex.HasValue)
            {
                pageindex = 1;
            }
            var model = GetModelList(pageindex, 10);
            return View("index", model);
        }
        public ActionResult Media(int? pageindex)
        {
            if (!pageindex.HasValue)
            {
                pageindex = 1;
            }
            var model = GetModelList(pageindex, 10);
            return View("index", model);
        }

        public ActionResult Detail(int? aid)
        {
            var model = GetModel(aid.Value);
            return View(model);
        }
    }
}