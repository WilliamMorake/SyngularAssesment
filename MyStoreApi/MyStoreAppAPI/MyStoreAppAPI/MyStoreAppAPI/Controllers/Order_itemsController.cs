using Microsoft.AspNetCore.Mvc;
using MyStoreAppAPI.Data;
using MyStoreAppAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyStoreAppAPI.Controllers
{
    [ApiController]
    public class CartItem
    {
        public int id { get; set; }
        public string? name { get; set; }
        public decimal price { get; set; }
        public int quantity { get; set; }
    }

    [ApiController]
    public class CartItemAdded
    {
        public int clientId { get; set; }
        public int quantity { get; set; }
        public int productId { get; set; }
    }

    [ApiController]
    [Route("api/[Controller]/[Action]")]
    public class Order_itemsController : Controller
    { 
        private readonly MyStoreAPIDBContext _context;
        public Order_itemsController(MyStoreAPIDBContext myStoreAPIDBContext)
        {
            _context = myStoreAPIDBContext;
        }

        [HttpGet(Name = "GetItemOrdersInCart")]
        public async Task<IActionResult> GetItemOrdersInCart(int clientId)
        {
            try
            {
                var orderedItems = await _context.Order_Items.FindAsync(clientId);

                if (orderedItems == null)
                {
                    return NotFound("Order not found");
                }

                return Ok(orderedItems);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPost(Name = "ClearCart")]
        public async Task<IActionResult> ClearCart(int clientId)
        {
            try
            {
                var ordersToRemove = _context.Orders.Where(item => item.client_id == clientId).ToList();

                foreach(var order in ordersToRemove)
                {
                    var orderitem = _context.Order_Items.Where(item => item.order_id == order.order_id).ToList();
                    _context.Order_Items.RemoveRange(orderitem);
                }

                _context.Orders.RemoveRange(ordersToRemove);
                

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPost(Name = "RemoveItemFromCart")]
        public async Task<IActionResult> RemoveItemFromCart(int orderItemId)
        {
            try
            {
                var orderItemsToRemove = _context.Order_Items.Find(orderItemId);//.Where(item => item.order_id == orderItemId).ToList();

                if (orderItemsToRemove == null)
                {
                    return NotFound("Order items not found");
                }

                _context.Order_Items.RemoveRange(orderItemsToRemove);

                var orderToRemove = await _context.Orders.FindAsync(orderItemsToRemove.order_id);
                if (orderToRemove != null)
                {
                    _context.Orders.Remove(orderToRemove);
                }

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpGet(Name = "GetCartItems")]
        public async Task<IActionResult> GetCartItems(int clientId)
        {
            try
            {
                var cart = new List<CartItem>();

                var orders = _context.Orders.Where(item => item.client_id == clientId).ToList();

                foreach (var order in orders)
                {
                    var orderItems = _context.Order_Items.Where(item => item.order_id == order.order_id).ToList();

                    foreach (var orderItem in orderItems)
                    {
                        var product = await _context.Products.FindAsync(orderItem.product_id);

                        if (product != null)
                        {
                            var cartItem = new CartItem
                            {
                                id = orderItem.order_item_id,
                                name = product.title,
                                price = product.price,
                                quantity = orderItem.quantity
                            };
                            cart.Add(cartItem);
                        }
                    }
                }

                return Ok(cart);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

        [HttpPost(Name = "AddItemToCart")]
        public async Task<IActionResult> AddItemToCart(CartItemAdded newItem)
        {
            try
            {
                // Create an order and save
                var order = new Orders
                {
                    client_id = newItem.clientId,
                    order_date = DateTime.Now
                };
                _context.Orders.Add(order);

                await _context.SaveChangesAsync();

                // Link the order with the order items
                var orderItem = new Order_items
                {
                    quantity = newItem.quantity,
                    product_id = newItem.productId,
                    order_id = order.order_id
                };
                _context.Order_Items.Add(orderItem);

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}
