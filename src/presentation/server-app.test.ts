import { create } from 'domain';
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { ServerApp } from './server-app';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

describe('Server App', ()=>{

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a ServerApp instance', ()=>{
    const serverApp = new ServerApp();
    expect( serverApp ).toBeInstanceOf(ServerApp);
    expect( typeof ServerApp.run ).toBe('function');
  });

  it('runs ServerApp with options', ()=> {
    const logSpy = jest.spyOn(console, 'log');
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

    const options = {
      base: 2,
      limit: 10,
      showTable: false,
      destination: 'test-destination',
      name: 'test-filename'
    }

    ServerApp.run(options);
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith('Server running...');
    expect(logSpy).toHaveBeenLastCalledWith('File created!');

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base, limit: options.limit
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.destination,
      fileName: `${options.name}-${options.base}`
    });
  });

  it('runs with custom values mocked', () => {
    const options = {
      base: 2,
      limit: 10,
      showTable: false,
      destination: 'test-destination',
      name: 'test-filename'
    }

    const logMock = jest.fn();
    const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
    const saveFileMock = jest.fn().mockReturnValue(true);
// 
    global.console.log = logMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith('Server running...');
    expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: '1 x 2 = 2',
      fileDestination: options.destination,
      fileName: `${options.name}-${options.base}`
    });
    expect(logMock).toHaveBeenCalledWith('File created!');

  });

});
