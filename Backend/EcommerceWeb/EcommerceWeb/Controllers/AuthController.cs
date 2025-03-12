using EcommerceWeb.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EcommerceWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _config;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if(!ModelState.IsValid) 
                return BadRequest(ModelState);

            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                Fullname = model.FullName,
                Role = model.Role 
            }; 

            var result = await _userManager.CreateAsync(user , model.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);


            return Ok(new { message = "User registerd successfully!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !(await _userManager.CheckPasswordAsync(user, model.Password)))
                return Unauthorized();

            var token = GenerateJwtToken(user);
            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    fullName = user.Fullname,
                    role = user.Role
                }
            });
        }

        private string  GenerateJwtToken(ApplicationUser user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("FullName", user.Fullname),
                new Claim("role", user.Role)
            };

            

            var token = new JwtSecurityToken(
               issuer: _config["Jwt:Issuer"],
               audience: _config["Jwt:Issuer"],
               claims: claims,
               expires: DateTime.UtcNow.AddHours(3),
               signingCredentials: credentials
           );


            return new JwtSecurityTokenHandler().WriteToken(token);
        }





        }
    }
