import { CalculateTotalPipe } from './calculate-total.pipe';

describe('CalculateTotalPipe', () => {
  let pipe: CalculateTotalPipe;

  beforeEach(()=>{
    pipe = new CalculateTotalPipe();
  })

  describe('transform', () => {
    it('if items does not has elements should return 0', () => {
        expect(pipe.transform([])).toEqual(0);
    })

    it('if items has elements should return the sum of the price of the elements ', () => {
        expect(pipe.transform([
            {
              qty:2, 
              product: {
                id: 1,
                name: 'hamburguesa',
                price: 500,
                image: "url de la imagen",
                type: 'Desayuno',
                dataEntry: "2022-03-05 15:14:10",
              },
            },
            {
                qty:10, 
                product: {
                  id: 1,
                  name: 'hamburguesa',
                  price: 300,
                  image: "url de la imagen",
                  type: 'Desayuno',
                  dataEntry: "2022-03-05 15:14:10",
                },
              }
        ])).toEqual(4000);
    })
  });

});
