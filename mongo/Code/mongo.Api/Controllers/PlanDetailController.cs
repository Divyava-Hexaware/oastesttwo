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
    public class PlanDetailController : ControllerBase
    {
        readonly IPlanDetailService _PlanDetailService;
        private readonly IMapper _mapper;
        public PlanDetailController(IPlanDetailService PlanDetailService,IMapper mapper)
        {
            _PlanDetailService = PlanDetailService;
            _mapper = mapper;
        }

        // GET: api/PlanDetail
        [HttpGet]
        public ActionResult<IEnumerable<PlanDetailDto>> Get()
        {
            var PlanDetailDTOs = _mapper.Map<IEnumerable<PlanDetailDto>>(_PlanDetailService.GetAll());
            return Ok(PlanDetailDTOs);
        }

        [HttpGet("{id}")]
        public ActionResult<PlanDetailDto> GetById(string id)
        {
            var PlanDetailDTO = _mapper.Map<PlanDetailDto>(_PlanDetailService.Get(id));
            return Ok(PlanDetailDTO);
        }

        [HttpPost]
        public ActionResult<PlanDetailDto> Save(PlanDetail PlanDetail)
        {
            var PlanDetailDTOs = _mapper.Map<PlanDetailDto>(_PlanDetailService.Save(PlanDetail));
            return Ok(PlanDetailDTOs);
        }

        [HttpPut("{id}")]
        public ActionResult<PlanDetailDto> Update([FromRoute] string id, PlanDetail PlanDetail)
        {
            var PlanDetailDTOs = _mapper.Map<PlanDetailDto>(_PlanDetailService.Update(id, PlanDetail));
            return Ok(PlanDetailDTOs);
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete([FromRoute] string id)
        {
            bool res = _PlanDetailService.Delete(id);
            return Ok(res);
    }


    }
}
