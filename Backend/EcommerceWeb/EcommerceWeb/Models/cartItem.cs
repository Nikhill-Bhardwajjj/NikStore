﻿using System.ComponentModel.DataAnnotations.Schema;

namespace EcommerceWeb.Models
{
    public class cartItem
    {

        public int Id { get; set; }

        [ForeignKey("Cart")]
        public int CartId { get; set; }
        public Cart Cart { get; set; }

        [ForeignKey("Product")]
        public int ProcuctId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; } 

    }
}
