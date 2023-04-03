using mongo.BusinessEntities.Entities;
using mongo.Contracts.DTO;
using AutoMapper;
namespace mongo.Api.Middleware
{
public class MappingFile : Profile
{
    public MappingFile()
    {
        // Mapping variables
		CreateMap<Test , TestDto>(); 
    }
  }
}
