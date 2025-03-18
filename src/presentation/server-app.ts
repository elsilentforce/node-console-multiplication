import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions{
  base: number,
  destination: string,
  limit: number,
  name: string,
  showTable: boolean,
}

export class ServerApp {
  static run({
    base,
    destination,
    limit,
    name,
    showTable
  }: RunOptions){
    console.log('Server running...');

    const table = new CreateTable().execute({ base, limit });
    const fileCreated = new SaveFile()
      .execute({
        fileContent: table,
        fileDestination: destination,
        fileName: `${ name }-${ base }`
      });

    if(showTable) console.log(table);

    ( fileCreated )
      ? console.log('File created!')
      : console.log('File not created!');
  }
}
