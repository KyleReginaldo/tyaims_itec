export class CodeTranformer {
  static getCodeMessages(code: number): string {
    switch (code) {
      case 1062:
        return 'the value you want to add is already existing';
    }
  }
}
