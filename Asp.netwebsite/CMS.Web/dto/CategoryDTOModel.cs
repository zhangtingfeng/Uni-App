using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Web.dto
{
    public class CategoryDTOModel
    {
        public string text { get; set; }
        public string url { get; set; }
        public string icon_url { get; set; }
        public List<CategoryDTOModel> children { get; set; }
    }
}