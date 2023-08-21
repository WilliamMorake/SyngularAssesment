using System.ComponentModel.DataAnnotations;

namespace MyStoreAppAPI.Model
{
    public class Order_items
    {
        [Key]
        public int order_item_id {get; set;}
        public int order_id { get; set;}
        public int product_id { get; set;}
        public int quantity { get; set;}

    }
}
