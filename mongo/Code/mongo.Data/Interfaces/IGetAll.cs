using System.Collections.Generic;

namespace mongo.Data.Interfaces
{
    public interface IGetAll<out T> where T : class
    {
        IEnumerable<T> GetAll();
    }
}
