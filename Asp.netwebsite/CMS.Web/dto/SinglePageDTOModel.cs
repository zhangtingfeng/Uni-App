using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Web.dto
{
    public class SinglePageDTOModel
    {
        /// <summary>
        /// 封面图片
        /// </summary>
        public string cover_image_url { get; set; }
        /// <summary>
        /// 栏目名称
        /// </summary>
        public string category_name { get; set; }
        /// <summary>
        /// 栏目ID
        /// </summary>
        public int category_id { get; set; }
        public string category_url { get; set; }
        public List<CategoryDTOModel> categorylist { get; set; }

        public string localpath { get; set; }

        public DTcms.Model.article article { get; set; }
        public DTcms.Model.article nextArticle { get; set; }
        public DTcms.Model.article preArticle { get; set; }
        public List<DTcms.Model.article> articlelist { get; set; }
        public int? TotalRecordCount { get; set; }
        public int? PageSize { get; set; }
        public int? PageIndex { get; set; }
    }
}