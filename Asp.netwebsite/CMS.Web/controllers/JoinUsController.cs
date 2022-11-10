using System.Web.Mvc;

namespace CMS.Web.Controllers
{
    public class JoinUsController : BaseController
    {
        protected override int _channelId => 10;
        public ActionResult TalentStrategy()
        {
            var model = GetModel("talent-strategy");
            return View("index",model);
        }
        public ActionResult Recruitment()
        {
            var model = GetModel("recruitment");
            model.localpath = Request.Url.LocalPath;
            return View("index", model);
        }
    }
}