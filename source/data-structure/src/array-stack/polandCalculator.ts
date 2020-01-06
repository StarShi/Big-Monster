import ArrayStack from "../../src/array-stack/index";

export default class PolandCalculator {

    private stack: ArrayStack = new ArrayStack(20);
    // 逆波兰计算
    public preExpression(exp: string): number | void {
        if (exp === "") return;
        let expArr: string[] = [];
        expArr = exp.split(" ");
        let len: number = expArr.length;
        let num1: number = 0;// 运算数1
        let num2: number = 0;// 运算数2
        for (let i: number = 0; i < len; i++) {
            let item = expArr[i];
            //如果是数，入数栈
            if (this.isNumber(item)) {
                this.stack.pushStack(Number(item));
            } else {//如果是符号，取出两个数运算，并将结果入栈
                num2 = this.stack.popStack();
                num1 = this.stack.popStack();
                this.stack.pushStack(this.calculate(num1, num2, item));
            }
        }
        return this.stack.popStack();
    }

    //中缀表达式的转换成后缀表达式
    public infixToPre(exp: string): string {
        let stackOper: ArrayStack = new ArrayStack(100);
        let tempArr: any[] = [];
        let len: number = exp.length;
        let keepNum: string = "";
        for (let i = 0; i < len; i++) {
            let item = exp[i];
            // 如果是操作数或小数点
            if (this.isNumber(item) || item === '.') {
                keepNum += item;
                if (i === len - 1) {
                    tempArr.push(keepNum);
                    break;
                }
                if (exp[i + 1] !== '.' && !this.isNumber(exp[i + 1])) {
                    tempArr.push(keepNum);
                    keepNum = "";
                }
            } else if (item === "(") {// 如果是左括号
                stackOper.pushStack(item);
            } else if (item === ")") {// 如果是右括号
                // 符号栈循环出栈，直到匹配到左括号为止
                while (stackOper.getTop() !== "(") {
                    tempArr.push(stackOper.popStack());
                };
                // 左括号出栈
                stackOper.popStack();
            } else {
                let curPriority: number = this.priority(item);
                // 如果当前运算符的优先级小于等于栈顶运算符
                // 将s1栈顶运算符弹出并压入s2中，然后对当前操作符再次进行判断
                while (!stackOper.isEmpty() && curPriority <= this.priority(stackOper.getTop())) {
                    tempArr.push(stackOper.popStack());
                }
                //最终使当前操作符入栈
                stackOper.pushStack(item)
            }

        }
        // 将s1中剩余的运算符加入到tempArr中
        while (!stackOper.isEmpty()) {
            tempArr.push(stackOper.popStack());
        }
        return tempArr.join(" ");
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