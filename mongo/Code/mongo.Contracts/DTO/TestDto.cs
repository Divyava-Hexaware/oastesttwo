using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes; 
using System.Runtime.Serialization; 
namespace mongo.Contracts.DTO {
   public class TestDto { 
     public string Id { get; set; }
        public string uname { get; set; } 
        public string pwd { get; set; } 
        public bool confirm { get; set; } 
} 
}
