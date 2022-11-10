using CMS.Web.dto;
using System.Web.Mvc;

namespace CMS.Web.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            var model = new HomeDTOModel();

            model.companynewslist = new DTcms.BLL.article().GetListAsync(1, 3, "category_id = 3", "add_time desc");
            model.industrynewslist = new DTcms.BLL.article().GetListAsync(1, 3, "category_id = 4", "add_time desc");
            model.medianewslist = new DTcms.BLL.article().GetListAsync(1, 3, "category_id = 5", "add_time desc");
            model.productlist = new DTcms.BLL.article().GetListAsync(8, 4, "category_id = 53 and is_top=1", "sort_id asc");
            model.solutionlist = new DTcms.BLL.article().GetListAsync(9, 4, "category_id = 67 and is_top=1", "sort_id asc");
            model.bannerlist = new DTcms.BLL.article().GetListAsync(12, 5, "category_id = 69", "sort_id asc");

            return View(model);
        }
    }
}