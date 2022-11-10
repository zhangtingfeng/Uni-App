using System.Web.Mvc;

namespace CMS.Web.Controllers
{
    public class AboutUsController : BaseController
    {
        protected override int _channelId => 7;
        public ActionResult Company()
        {
            var model = GetModel("company");
            return View("index", model);
        }
        public ActionResult Culture()
        {
            var model = GetModel("culture");
            return View("index", model);
        }
        public ActionResult Honor()
        {
            var model = GetModelList();
            return View( model);
        }
        public ActionResult Team()
        {
            var model = GetModelList();
            return View("team", model);
        }
        public ActionResult History()
        {
            var model = GetModelList();
            return View(model);
        }
    }
}