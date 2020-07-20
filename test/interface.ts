interface IGrandFather {
  gra: number; // GrandFather
}
interface IFather extends IGrandFather {
  fat: number; // Father
}
interface IProps extends IFather {
  boo: boolean; // boolean
  num: number; // number
  str: string; // string
  obj: Object; // object
  obj2: {
    child: IChild;
  };
  arr: Array<boolean>; // Array
  arr2: Array<IChild>;
  arr3: Array<{
    child: IChild;
  }>;
  fun: Function; // Function
  fun2: (n: number) => void; // Function
  child: IChild;
}
interface IChild {
  name: string;
}
