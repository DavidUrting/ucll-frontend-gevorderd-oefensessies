using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webshop.Web.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Webshop.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private static List<Product> _products = new List<Product>()
        {
            new Product()
            {
                Id = 0,
                Name = "AMD Ryzen 5 3500X",
                Description = "",
                Category = "CPU",
                Price = 200
            },
            new Product()
            {
                Id = 1,
                Name = "AMD Ryzen 7 5800X",
                Description = "",
                Category = "CPU",
                Price = 530
            },
            new Product()
            {
                Id = 2,
                Name = "Gigabyte GeForce GTX 1650 D6 Eagle OC 4G",
                Description = "",
                Category = "GPU",
                Price = 199
            },
            new Product()
            {
                Id = 3,
                Name = "Gigabyte GeForce RTX 3060 Ti GAMING OC PRO 8G",
                Description = "",
                Category = "GPU",
                Price = 699
            }
        };

        // GET: api/<ProductController>
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _products;
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public Product Get(int id)
        {
            return _products.Where(p => p.Id == id).FirstOrDefault();
        }
    }
}
