using CMS.Web.dto;
using System.Web.Mvc;

namespace CMS.Web.Controllers
{
    public class ContactUsController : BaseController
    {
        protected override int _channelId => 11;
        public ActionResult Index()
        {
            var model = GetModel("contactus");
            return View(model);
        }
        public ActionResult BaiduMap()
        {
            return View("map");
        }
    }
}