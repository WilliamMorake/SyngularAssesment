using Microsoft.AspNetCore.Mvc;
using MyStoreAppAPI.Data;
using MyStoreAppAPI.Model;
using System.Net.WebSockets;

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
    [Route("api/[Controller]/[Action]")]
    public class Order_itemsController : Controller
    {
        private readonly MyStoreAPIDBContext _context;
        public Order_itemsController(MyStoreAPIDBContext myStoreAPIDBContext)
        {
            _context = myStoreAPIDBContext;
        }

        [HttpGet(Name ="GetItemOrdersInCart")]
        
        public async Task<IActionResult> GetItemOrdersInCart(int clientId)
        {
            var orderedItems = await _context.Order_Items.FindAsync(clientId);
            return Ok(orderedItems);
        }

        [HttpPost(Name = "ClearCart")]

        public async Task<IActionResult> ClearCart(int clientId)
        {
            foreach(var item in _context.Orders.ToList<Orders>())
            {
                if (item.client_id == clientId)
                {
                    foreach (var oderItem in _context.Order_Items.ToList<Order_items>())
                    {
                        if(oderItem.order_id == item.order_id)
                        {
                            _context.Orders.Remove(item);
                            _context.Order_Items.Remove(oderItem);

                            await _context.SaveChangesAsync();
                        }
                    }
                }
            }
            return Ok();
        }

        [HttpPost(Name = "RemoveItemFromCart")]
        public async Task<IActionResult> RemoveItemFromCart(int oderitemId) 
        {
            var orderitem = await _context.Order_Items.FindAsync(oderitemId);
            
            if (orderitem != null)
            {   
                var order = await _context.Orders.FindAsync(orderitem.order_id);
                if(order != null)
                {
                _context.Orders.Remove(order);
                _context.Order_Items.Remove(orderitem);

                await _context.SaveChangesAsync();
                }
            }
            
            return Ok();
        }

        [HttpGet(Name = "GetCartItems")]
        public async Task<IActionResult> GetCartItems(int clientId) 
        {
            try
            {
                // Get the order associate with the client

                // Get the name of the product associated with the order

                // compose cart items

                // returm cart items 

                List<CartItem> cart = new List<CartItem>();


                    foreach (var item in _context.Orders.ToList<Orders>())
                    {
                        

                        if (item.client_id == clientId)
                        {
                            

                            foreach(var order in _context.Order_Items.ToList<Order_items>())
                            {
                                if(order.order_id == item.order_id)
                                {
                                    CartItem cartItem = new CartItem();
                                    var product = await _context.Products.FindAsync(order.product_id);

                                    cartItem.price = product.price;
                                    cartItem.quantity = 1;
                                    cartItem.name = product.title;
                                    cartItem.id = order.order_item_id;   
                                    cart.Add(cartItem);
                                }
                                
                            }
                        }
                    }

                    return Ok(cart);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost(Name = "AddItemToCart")]
        public async Task<IActionResult> AddItemToCart(int clientId, int productId, int quantity) 
        {
            try
            {
                //Create an order and save
                var order = new Orders();
                order.client_id = clientId;
                order.order_date = DateTime.Now;
                _context.Orders.Add(order);

                await _context.SaveChangesAsync();

                //Link the order with the oderitems
                var oderitem = new Order_items();
                oderitem.quantity = quantity;
                oderitem.product_id = productId;
                oderitem.order_id = order.order_id;
                _context.Order_Items.Add(oderitem);

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
