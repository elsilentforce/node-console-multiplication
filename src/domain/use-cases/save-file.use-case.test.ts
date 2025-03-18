import { SaveFile } from './save-file.use-case';
import fs from 'fs'; 

describe('SaveFileUseCase', ()=>{
  const saveFile = new SaveFile();
  const defaultOptions = {
    fileContent: 'test content'
  };
  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs/file-destination',
    fileName: 'custom-table-name'
  }
  
  afterEach(()=>{
    const existsDefaultOutput = fs.existsSync('outputs');
    if( existsDefaultOutput ) fs.rmSync('outputs', { recursive: true });

    const existsCustomOutput = fs.existsSync('custom-outputs');
    if( existsCustomOutput ) fs.rmSync('custom-outputs', { recursive: true });
  });


  it('saves file with default values', ()=>{
    const filePath = 'outputs/table.txt'
    const result = saveFile.execute(defaultOptions);
    
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
    
    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(defaultOptions.fileContent);
  });

  it('saves file with custom values', ()=>{
    
    const filePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
    const result = saveFile.execute(customOptions);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);
  });

  it('returns false when directory cannot be created', ()=>{
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
      () => { throw new Error('Error creating Directory'); }
    );
    const result = saveFile.execute(customOptions);

    expect( result ).toBe(false);
    mkdirSpy.mockRestore();
  });

  it('returns false when file cannot be created', () => {
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
      () => { throw new Error('Error creating File'); }
    );
    const result = saveFile.execute(defaultOptions);
    expect(result).toBe(false);
    writeFileSyncSpy.mockRestore();
  });
});
