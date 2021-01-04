using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Webshop.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private static List<int> _productsInCarts = new List<int>();

        // GET: api/<CartController>
        [HttpGet]
        public IEnumerable<int> Get()
        {
            return _productsInCarts;
        }

        // POST api/<CartController>
        [HttpPost]
        public void Post([FromBody] int value)
        {
            _productsInCarts.Add(value);
        }

        // DELETE api/<CartController>/5
        [HttpDelete]
        public void Delete([FromBody] int id)
        {
            _productsInCarts.Remove(id);
        }
    }
}
