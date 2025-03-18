import { CreateTable } from  './crate-table.use-case'

describe('CreateTableUseCase', () => {
  const createTable = new CreateTable();

  it('creates an instance of CreateTable', ()=>{
    expect( createTable ).toBeInstanceOf( CreateTable );
  });

  describe('with default values', () => {
    const defaultTable = createTable.execute({ base: 2 });
    const defaultRows = defaultTable.split(`\n`).length;

    it('creates base multiplication', ()=>{
      expect(defaultTable).toContain("2 x 1 = 2");
      expect(defaultTable).toContain("2 x 10 = 20")
    });

    it('creates a table with 10 rows', ()=>{
      expect(defaultRows).toBe(10);
    });

  });

  describe('with custom values', () =>{
    const options = {
      base: 3,
      limit: 20
    }
    const customTable = createTable.execute(options);
    const customRows = customTable.split(`\n`).length;

    it('creates custom base multiplications', ()=>{
      expect(customTable).toContain("3 x 1 = 3");
      expect(customTable).toContain("3 x 10 = 30");
    });

    it('creates a table with custom amount of rows', ()=>{
      expect(customRows).toBe(options.limit);
    });
  });
});
