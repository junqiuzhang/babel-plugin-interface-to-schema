interface IGrandFather {
  gra: number; // GrandFather

}
interface IFather extends IGrandFather {
  fat: number; // Father

}
interface IProps extends IFather {
  str: string; // string

  num: number; // number

  boo: boolean; // boolean

  obj: object; // object

  arr: Array<boolean>; // Array

  fun: Function; // Function

  func: (n: number) => void; // Function

}
