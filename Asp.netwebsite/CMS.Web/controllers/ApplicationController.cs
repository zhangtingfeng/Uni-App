using System.Web.Mvc;

namespace CMS.Web.Controllers
{
    public class ApplicationController : BaseController
    {
        protected override int _channelId => 9;
        public ActionResult market()
        {
            var model = GetModel("market");
            return View("index",model);
        }
        public ActionResult aftersale()
        {
            var model = GetModel("aftersale");
            return View("index",model);
        }
        public ActionResult solution()
        {
            var model = GetModelList();
            return View("solution", model);
        }
        public ActionResult Detail(int? aid)
        {
            var model = GetModel(aid.Value);
            return View(model);
        }
    }
}