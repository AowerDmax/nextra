export interface Interview {
    id: string;
    section?: number;  // section 是可选的，因为有些文档可能没有这个字段
    path: string;
    qa: Array<{ [key: string]: string }>;
    application: string;
    related: Array<{ [key: string]: string }>;
    fileHash: string;
    fileName: string;
    folder: string;
    title: string;
    url: string;
}

export interface InterviewList {
    interviews: Interview[];
}

function formatHeader(header: string | undefined): string {
    if (!header) {
        return '';
    }

    // 正则表达式，用于去掉以1到6个#号开头的行，并返回剩余的内容
    const headerPattern = /^#{1,6}\s*(.*)$/;

    // 直接对输入的字符串进行匹配处理，去掉符合标题格式的部分
    const match = header.trim().match(headerPattern);
    return match ? escapeHtml(processFileName(match[1].trim())) : escapeHtml(processFileName(header.trim())); // 返回去掉 # 号后的内容，如果不匹配则返回原始内容
}




function escapeHtml(text) {
    return text.replaceAll('？', "?")  // 替换全角问号为半角问号
               .replaceAll('（', "")  // 替换全角左括号为半角左括号
               .replaceAll('）', "")  // 替换全角右括号为半角右括号
               .replaceAll('【', "")  // 替换全角左中括号为半角左中括号
               .replaceAll('】', "")  // 替换全角右中括号为半角右中括号
               .replaceAll('《', "")  // 替换全角左尖括号为半角左尖括号
               .replaceAll('》', "")  // 替换全角右尖括号为半角右尖括号
               .replaceAll('“', "")  // 替换全角左引号为HTML转义的左引号
               .replaceAll('”', "")  // 替换全角右引号为HTML转义的右引号
               .replaceAll('‘', "")  // 替换全角单引号为HTML转义的左单引号
               .replaceAll('’', "")  // 替换全角单引号为HTML转义的右单引号
               .replaceAll('、', ",")   // 替换顿号为半角逗号
               .replaceAll('；', ";")   // 替换全角分号为半角分号
               .replaceAll('：', ":")   // 替换全角冒号为半角冒号
               .replaceAll('。', ".")   // 替换句号为半角句号
               .replaceAll('，', ",")   // 替换全角逗号为半角逗号
               .replaceAll('！', "!")   // 替换全角感叹号为半角感叹号
               .replaceAll('——', "") // 替换中文破折号为HTML转义的破折号
               .replaceAll('·', "")  // 替换中文间隔号为HTML转义的间隔号
               .replaceAll('(', "")      // 转义左圆括号
               .replaceAll(')', "")      // 转义右圆括号
               .replaceAll('{', "")    // 转义左花括号
               .replaceAll('}', "")    // 转义右花括号
               .replaceAll('[', "")     // 转义左方括号
               .replaceAll(']', "")
               .replaceAll('&', "")
               .replaceAll('<', "")
               .replaceAll('>', "")
               .replaceAll('"', "")
               .replaceAll('\'', "")
               .replaceAll('/', "")   // 转义斜杠
               .replaceAll('`', "")   // 转义反引号;    // 转义右方括号
}

function wrapTextWithBackticks(text: string): string {
    const lines = text.split('\n');
    let result = '';
    let inCodeBlock = false;
    const errorChars = /[+-@<>{}()[\]'"]/;

    for (const line of lines) {
        let newLine = '';
        let i = 0;
        
        while (i < line.length) {
            const char = line[i];

            if (inCodeBlock) {
                // 在代码块内，直接复制内容
                if (line.slice(i, i + 3) === '```') {
                    inCodeBlock = false;
                    newLine += '\n```\n';
                    i += 3; // 跳过 ```
                    continue;
                }
                newLine += char;
                i++;
            } else if (line.slice(i, i + 3) === '```') {
                // 处理代码块开始
                inCodeBlock = true;
                newLine += '\n```';
                i += 3; // 跳过 ```
                // 处理语言标识
                let language = '';
                while (i < line.length && !/\s/.test(line[i])) {
                    language += line[i];
                    i++;
                }
                newLine += language + '\n';
            } else if (char === '`' && line.slice(i, i + 3) !== '```') {
                // 处理内联代码块
                const start = i;
                i++;
                while (i < line.length && line[i] !== '`') {
                    i++;
                }
                
                if (i < line.length && line[i] === '`') {
                    i++; // 包括结束的 `
                }
                
                newLine += line.slice(start, i);
                
                // 如果在行末且未闭合反引号，自动闭合
                if (i >= line.length && line[i - 1] !== '`') {
                    newLine += '`';
                }
            } else if (errorChars.test(char)) {
                // 如果遇到错误字符，开始包裹
                const start = i;
                let end = i + 1;
                let index = i + 1; // 从下一个字符开始检查

                while (index < line.length && line[index] !== '`') {
                    if (errorChars.test(line[index])) {
                        end = index + 1; // 更新结束位置
                    }
                    index++;
                }

                newLine += '`' + line.slice(start, end) + '`';
                i = end; // 更新i的位置到end
            } else {
                // 普通字符，直接添加
                newLine += char;
                i++;
            }
        }
        result += newLine + '\n';
    }

    return result;
}







function processFileName(str) {
    if (str.startsWith('@')) {
        // 如果 fileName 以 @ 开头，用反引号包裹
        return "对于" + `${str}`;
    } 
    // 否则保持不变
    return str;
}


export default function formatInterview(interviewList: InterviewList): string {
    // console.log("interviewList: " + interviewList.interviews);
    const { interviews } = interviewList;
    // 检查 interviews 是否定义并且不为空
    if (!interviews || interviews.length === 0) {
        return 'No interviews available'; // 或者返回其他适当的默认值或错误信息
    }
    const inte = interviews[0];
    return `
---
title: ${formatHeader(inte.fileName)}
description: ${formatHeader(inte.fileName)}
---

# ${formatHeader(inte.title)}

${interviews.map(interview => `
## ${formatHeader(interview.title)}


${interview.qa ? `
### QA
<Steps>
${interview.qa.map((item, index) => `
${Object.entries(item).map(([question, answer]) => {
    // const str = "在 React Intl 中，可以使用占位符（如 `{name}`）来动态插入变量。通过传递对象给 <FormattedMessage> 的 values 属性，React Intl 会自动替换占位符为相应的变量值。这在需要显示动态内容时非常有用，如用户名字、时间、数量等。"
    const SafeQuestion = wrapTextWithBackticks(question)
    const SafeAnswer = wrapTextWithBackticks(answer)
    // console.log("SafeQuestion: " + SafeQuestion)
    // console.log("SafeAnswer: " + SafeAnswer)
    return `
### Step ${index + 1}
**Q:**: ${SafeQuestion}

**A:**: ${SafeAnswer}
`
}
).join('\n')
}
`).join('\n')}
</Steps>
` : ''}
    
    
${interview.application ? `
### 用途

<Cards.Card title=${JSON.stringify(wrapTextWithBackticks(interview.application))} href="/" />
` : ''}
    
${interview.related ? `
    
### 相关问题
${interview.related.map(relatedItem => `
${Object.entries(relatedItem).map(([question, answer]) => {
    const safeQuestion = escapeHtml(question);  // 对 question 进行转义
    const safeAnswer = wrapTextWithBackticks(answer);  // 对 question 进行转义
    // const safeQuestion = 'aaa';  // 对 question 进行转义
    // const safeAnswer = 'aaa';  // 对 question 进行转义
    // console.log("SafeQuestion: " + safeQuestion)
    // console.log("SafeAnswer: " + safeAnswer)
    return `
<Callout type="success" title="${safeQuestion}" emoji='🦆' collapsible>

${safeAnswer}

</Callout>
    `;
}).join('\n')}
`).join('\n')}
` : ''}


    
`).join('\n')}
`.trim();
}


