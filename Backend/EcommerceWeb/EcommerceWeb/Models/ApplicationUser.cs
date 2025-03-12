using Microsoft.AspNetCore.Identity;

namespace EcommerceWeb.Models
{
    public class ApplicationUser : IdentityUser
    {

        public string Fullname { get; set; } 
        public string Role {  get; set; } 

    }
}
