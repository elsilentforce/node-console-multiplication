import { SaveFile } from './save-file.use-case';
import fs from 'fs'; 

describe('SaveFileUseCase', ()=>{
  afterEach(()=>{
    const existsDefaultOutput = fs.existsSync('outputs');
    if( existsDefaultOutput ) fs.rmSync('outputs', { recursive: true });

    const existsCustomOutput = fs.existsSync('custom-outputs');
    if( existsCustomOutput ) fs.rmSync('custom-outputs', { recursive: true });
  });

  const saveFile = new SaveFile();

  it('saves file with default values', ()=>{
    const filePath = 'outputs/table.txt'
    const options = {
      fileContent: 'test content'
    };
    const result = saveFile.execute(options);
    
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
    
    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  it('saves file with custom values', ()=>{
    const options = {
      fileContent: 'custom content',
      fileDestination: 'custom-outputs/file-destination',
      fileName: 'custom-table-name'
    }
    const filePath = `${options.fileDestination}/${options.fileName}.txt`;
    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });
});
