using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Web.dto
{
    public class HomeDTOModel
    {
        public List<DTcms.Model.article> companynewslist { get; set; }
        public List<DTcms.Model.article> industrynewslist { get; set; }
        public List<DTcms.Model.article> medianewslist { get; set; }
        public List<DTcms.Model.article> productlist { get; set; }
        public List<DTcms.Model.article> solutionlist { get; set; }
        public List<DTcms.Model.article> bannerlist { get; set; }
    }
}