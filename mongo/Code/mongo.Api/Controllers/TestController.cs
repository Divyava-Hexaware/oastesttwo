using System.Collections.Generic;
using mongo.BusinessServices.Interfaces;
using mongo.BusinessEntities.Entities;
using mongo.Contracts.DTO;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace mongo.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        readonly ITestService _TestService;
        private readonly IMapper _mapper;
        public TestController(ITestService TestService,IMapper mapper)
        {
            _TestService = TestService;
            _mapper = mapper;
        }

        // GET: api/Test
        [HttpGet]
        public ActionResult<IEnumerable<TestDto>> Get()
        {
            var TestDTOs = _mapper.Map<IEnumerable<TestDto>>(_TestService.GetAll());
            return Ok(TestDTOs);
        }

        [HttpGet("{id}")]
        public ActionResult<TestDto> GetById(string id)
        {
            var TestDTO = _mapper.Map<TestDto>(_TestService.Get(id));
            return Ok(TestDTO);
        }

        [HttpPost]
        public ActionResult<TestDto> Save(Test Test)
        {
            var TestDTOs = _mapper.Map<TestDto>(_TestService.Save(Test));
            return Ok(TestDTOs);
        }

        [HttpPut("{id}")]
        public ActionResult<TestDto> Update([FromRoute] string id, Test Test)
        {
            var TestDTOs = _mapper.Map<TestDto>(_TestService.Update(id, Test));
            return Ok(TestDTOs);
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete([FromRoute] string id)
        {
            bool res = _TestService.Delete(id);
            return Ok(res);
    }


    }
}
