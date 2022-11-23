using System.Web.Mvc;

namespace CMS.Web.Controllers
{
    public class ProductController : BaseController
    {
        protected override int _channelId => 8;
        public ActionResult Index()
        {
            if (!int.TryParse(Request["id"], out int id))
            {
                id = new DTcms.BLL.article().GetTop1Model(_channelId, 53).id;
            }
            var model = GetProductModel(id);
            return View(model);
        }
    }
}