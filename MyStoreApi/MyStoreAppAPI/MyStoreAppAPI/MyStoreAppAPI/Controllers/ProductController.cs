using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyStoreAppAPI.Data;

namespace MyStoreAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ProductController : Controller
    {
        private readonly MyStoreAPIDBContext _context;

        public ProductController(MyStoreAPIDBContext myStoreAPIDBContext)
        {
            _context = myStoreAPIDBContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var products = await _context.Products.ToListAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching products.");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetProduct(int productId)
        {
            try
            {
                var product = await _context.Products.FindAsync(productId);
                if (product != null)
                {
                    return Ok(product);
                }
                else
                {
                    return NotFound("Product not found.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching the product.");
            }
        }

    }
}
