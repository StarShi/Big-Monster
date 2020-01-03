import ArrayStack from "./index";

export default class Calculator {
    public expression: string = "";
    private numberStack: ArrayStack = new ArrayStack(10);
    private operateStack: ArrayStack = new ArrayStack(10);
    // 计算
    public calc(exp: string): number | void {
        if (exp === "") return;
        this.expression = exp;
        let len: number = this.expression.length;
        let num1: number = 0;// 运算数1
        let num2: number = 0;// 运算数2
        let oper: string = '';// 操作符
        let res: number = 0;// 缓存运算结果
        let keepNum: string = "";//缓存多位数
        for (let i: number = 0; i < len; i++) {
            // 如果是运算符
            if (this.isOperation(this.expression[i])) {
                let flag: boolean = !this.operateStack.isEmpty() && (this.priority(this.operateStack.getTop()) < this.priority(this.expression[i]));
                if (this.operateStack.isEmpty() || flag) {
                    this.operateStack.pushStack(this.expression[i])
                } else {
                    num2 = this.numberStack.popStack();//取出操作数
                    num1 = this.numberStack.popStack();//取出操作数
                    oper = this.operateStack.popStack();//取出栈顶操作符
                    res = this.calculate(num1, num2, oper);
                    this.numberStack.pushStack(res);//计算结果入栈
                    this.operateStack.pushStack(this.expression[i]);//当前操作符入栈
                }
            }
            //  如果是最后一位 直接入栈
            if (i === len - 1) {
                this.numberStack.pushStack(Number(this.expression[i]));
            }

            // 如果是多位数，需要查看下一位是否是操作符，是，则直接入栈
            if (this.isNumber(this.expression[i])) {
                keepNum += this.expression[i];
                if (this.expression[i + 1] && this.isOperation(this.expression[i + 1])) {
                    this.numberStack.pushStack(Number(keepNum));
                    keepNum = "";//清空缓存
                }
            }
            console.log(this.numberStack);
            console.log(this.operateStack);
        }
        // 当符号栈不为空时，
        while (!this.operateStack.isEmpty()) {
            num2 = this.numberStack.popStack();//取出操作数
            num1 = this.numberStack.popStack();//取出操作数
            oper = this.operateStack.popStack();//取出操作符
            res = this.calculate(num1, num2, oper);
            this.numberStack.pushStack(res);
        }
        return res;
    }

    // 判断运算符优先级
    public priority(operation: string): number {
        if (operation === "*" || operation === "/") {
            return 2
        } else if (operation === "+" || operation === "-") {
            return 1
        } else {
            return -1
        }
    }
    // 判断是否是操作符
    public isOperation(operation: string) {
        return operation === "*" || operation === "/" || operation === "+" || operation === "-";
    }
    // 判断是否是数字
    public isNumber(num: string) {
        let reg: RegExp = /^\d+(.\d*)?$/;
        return reg.test(num);
    }
    // 计算
    public calculate(num1: number, num2: number, operation: string): number {
        let result = 0;//计算结果
        switch (operation) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                result = num1 / num2;
                break;
            default:
                break;
        }
        return result;
    }
}