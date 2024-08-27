interface ProblemExplain {
    approach: string;
    timeComplexity: {
        analysis: string;
        result: string;
    };
    spaceComplexity: {
        analysis: string;
        result: string;
    };
    code: string;
}

interface SimilarQuestion {
    titleSlug: string;
    titleCn: string;
    contentCn: string | null;
    tagsQ: Record<string, string>;
    path: string;
}

interface ProblemSubmission {
    submissionId: number;
    lang: string;
    language: string;
    memory: string;
    runtime: string;
    timestamp: string;
    code: string;
    isMine: boolean;
}

interface ProblemData {
    id: string;
    acRate: string;
    contentCn: string;
    contentEn: string;
    difficulty: number;
    explain: ProblemExplain;
    frontendId: string;
    paidOnly: boolean;
    similarQuestions: SimilarQuestion[];
    submission: ProblemSubmission;
    tagsQ: string[];
    tags: Record<string, string>;
    titleCn: string;
    titleEn: string;
    titleSlug: string;
    totalAcs: number;
    totalSubmitted: number;
    explore: Array<{
        content: string;
        explanation: string;
    }>;
    codeSolutions: {
        java?: string;
        javaStream?: string;
        javaScript?: string;
        [key: string]: string | undefined;
    };
    solutions: Record<string, any>;
    path: string;
    contentJsxCn: string;
    contentJsxCnFlag: boolean;
}

function difficultyFilter(difficulty: number): string {
    const mapping = {
        1: '<Button className="text-sm py-0.5 px-0.5 bg-green-500">简单</Button>',
        2: '<Button className="text-sm py-0.5 px-0.5 bg-yellow-500">中等</Button>',
        3: '<Button className="text-sm py-0.5 px-0.5 bg-red-500">困难</Button>',
    };
    return mapping[difficulty] || '<Button className="text-sm py-0.5 px-0.5 bg-gray-500">未知</Button>';
}


function tagFilter(tag: string): string {
    const tags: Record<string, string> = {
        'array': '数组',
        'hash-table': '哈希表',
        'recursion': '递归',
        'linked-list': '链表',
        'math': '数学',
        'string': '字符串',
        'sliding-window': '滑动窗口',
        'binary-search': '二分查找',
        'divide-and-conquer': '分治',
        'dynamic-programming': '动态规划',
        'greedy': '贪心',
        'two-pointers': '双指针',
        'trie': '字典树',
        'sorting': '排序',
        'backtracking': '回溯',
        'stack': '栈',
        'heap-priority-queue': '堆（优先队列）',
        'merge-sort': '归并排序',
        'string-matching': '字符串匹配',
        'bit-manipulation': '位运算',
        'matrix': '矩阵',
        'monotonic-stack': '单调栈',
        'simulation': '模拟',
        'combinatorics': '组合数学',
        'memoization': '记忆化搜索',
        'tree': '树',
        'depth-first-search': '深度优先搜索',
        'binary-tree': '二叉树',
        'binary-search-tree': '二叉搜索树',
        'breadth-first-search': '广度优先搜索',
        'union-find': '并查集',
        'graph': '图',
        'design': '设计',
        'doubly-linked-list': '双向链表',
        'geometry': '几何',
        'interactive': '交互',
        'bucket-sort': '桶排序',
        'radix-sort': '基数排序',
        'counting': '计数',
        'iterator': '迭代器',
        'hash-function': '哈希函数',
        'rolling-hash': '滚动哈希',
        'enumeration': '枚举',
        'number-theory': '数论',
        'topological-sort': '拓扑排序',
        'prefix-sum': '前缀和',
        'quickselect': '快速选择',
        'binary-indexed-tree': '树状数组',
        'segment-tree': '线段树',
        'ordered-set': '有序集合',
        'line-sweep': '扫描线',
        'queue': '队列',
        'monotonic-queue': '单调队列',
        'counting-sort': '计数排序',
        'brainteaser': '脑筋急转弯',
        'game-theory': '博弈',
        'data-stream': '数据流',
        'eulerian-circuit': '欧拉回路',
        'randomized': '随机化',
        'reservoir-sampling': '水塘抽样',
        'shortest-path': '最短路',
        'bitmask': '状态压缩',
        'probability-and-statistics': '概率与统计',
        'rejection-sampling': '拒绝采样',
        'suffix-array': '后缀数组',
        'minimum-spanning-tree': '最小生成树',
        'concurrency': '多线程',
        'biconnected-component': '双连通分量',
        'strongly-connected-component': '强连通分量'
    };
    const tagMapping = {
        'array': 'bg-blue-500',
        'hash-table': 'bg-purple-500',
        'recursion': 'bg-indigo-500',
        'linked-list': 'bg-pink-500',
        'math': 'bg-teal-500',
        'string': 'bg-cyan-500',
        'sliding-window': 'bg-amber-500',
        'binary-search': 'bg-orange-500',
        'divide-and-conquer': 'bg-lime-500',
        'dynamic-programming': 'bg-emerald-500',
        'greedy': 'bg-rose-500',
        'two-pointers': 'bg-fuchsia-500',
        'trie': 'bg-violet-500',
        'sorting': 'bg-gray-500',
        'backtracking': 'bg-stone-500',
        'stack': 'bg-zinc-500',
        'heap-priority-queue': 'bg-neutral-500',
        'merge-sort': 'bg-sky-500',
        'string-matching': 'bg-red-600',
        'bit-manipulation': 'bg-green-600',
        'matrix': 'bg-yellow-600',
        'monotonic-stack': 'bg-purple-600',
        'simulation': 'bg-blue-600',
        'combinatorics': 'bg-orange-600',
        'memoization': 'bg-pink-600',
        'tree': 'bg-cyan-600',
        'depth-first-search': 'bg-teal-600',
        'binary-tree': 'bg-rose-600',
        'binary-search-tree': 'bg-lime-600',
        'breadth-first-search': 'bg-indigo-600',
        'union-find': 'bg-emerald-600',
        'graph': 'bg-amber-600',
        'design': 'bg-fuchsia-600',
        'doubly-linked-list': 'bg-gray-600',
        'geometry': 'bg-stone-600',
        'interactive': 'bg-zinc-600',
        'bucket-sort': 'bg-neutral-600',
        'radix-sort': 'bg-blue-700',
        'counting': 'bg-red-700',
        'iterator': 'bg-green-700',
        'hash-function': 'bg-yellow-700',
        'rolling-hash': 'bg-purple-700',
        'enumeration': 'bg-pink-700',
        'number-theory': 'bg-orange-700',
        'topological-sort': 'bg-teal-700',
        'prefix-sum': 'bg-cyan-700',
        'quickselect': 'bg-indigo-700',
        'binary-indexed-tree': 'bg-lime-700',
        'segment-tree': 'bg-emerald-700',
        'ordered-set': 'bg-fuchsia-700',
        'line-sweep': 'bg-gray-700',
        'queue': 'bg-rose-700',
        'monotonic-queue': 'bg-amber-700',
        'counting-sort': 'bg-stone-700',
        'brainteaser': 'bg-zinc-700',
        'game-theory': 'bg-neutral-700',
        'data-stream': 'bg-blue-800',
        'eulerian-circuit': 'bg-red-800',
        'randomized': 'bg-green-800',
        'reservoir-sampling': 'bg-yellow-800',
        'shortest-path': 'bg-purple-800',
        'bitmask': 'bg-pink-800',
        'probability-and-statistics': 'bg-orange-800',
        'rejection-sampling': 'bg-teal-800',
        'suffix-array': 'bg-cyan-800',
        'minimum-spanning-tree': 'bg-indigo-800',
        'concurrency': 'bg-lime-800',
        'biconnected-component': 'bg-emerald-800',
        'strongly-connected-component': 'bg-amber-800'
    };
    const color = tagMapping[tag] || 'bg-gray-500';
    return `<Button className="text-sm py-0.5 px-0.5 ${color}">${tags[tag] || tag}</Button>`;
}


function formatCodeBlock(code: string | undefined): string {
    if (!code) {
        return '';
    }

    // 正则表达式，用于检查并去除被 ```语言 或者 ``` 包裹的代码
    const codeBlockPattern = /^```[a-zA-Z]*\n([\s\S]*?)\n```$/;

    const match = code.trim().match(codeBlockPattern);
    if (match) {
        // 如果匹配到了，就返回去掉 ```语言 和 ``` 的代码内容
        return match[1].trim();
    }
    
    // 如果没有被包裹，则返回原来的内容
    return code;
}


export default function formatLeetcode(problem: ProblemData): string {
    const title = problem.titleCn || problem.titleEn;
    const description = `leetcode, ${title}`;
    return `
---
title: ${title}
description: ${description}
---


# ${problem.titleCn ? problem.titleCn: problem.titleEn}

**难度:** ${difficultyFilter(problem.difficulty)}

**标签:**
${Object.keys(problem.tags)
    .map(tagSlug => tagFilter(tagSlug))
    .join('\n')}

## 题目描述
<div dangerouslySetInnerHTML={{ __html: ${problem.contentJsxCnFlag ? JSON.stringify(problem.contentJsxCn) : JSON.stringify(problem.contentEn)} }} />


## 代码结果

**运行时间:** ${problem.submission.runtime}, 
**内存:** ${problem.submission.memory}

---
${problem.codeSolutions ? `
<Tabs items={['Java Stream', 'Java', 'Python', 'JavaScript']}>
    <Tabs.Tab>
${problem.codeSolutions.javaStream ? `
\`\`\`java
${formatCodeBlock(problem.codeSolutions.javaStream)}
\`\`\`` : ''}
    </Tabs.Tab>
    <Tabs.Tab>
${problem.codeSolutions.java ? `
\`\`\`java
${formatCodeBlock(problem.codeSolutions.java)}
\`\`\`` : ''}
    </Tabs.Tab>
    <Tabs.Tab>
${problem.explain.code ? `
\`\`\`python
${formatCodeBlock(problem.explain.code)}
\`\`\`` : ''}
    </Tabs.Tab>
    <Tabs.Tab>
${problem.codeSolutions.javaScript ? `
\`\`\`javascript
${formatCodeBlock(problem.codeSolutions.javaScript)}
\`\`\`` : ''}
    </Tabs.Tab>
</Tabs>
---
` : ''}

${problem.explain ? `
## 解释

**方法:** 
<div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(problem.explain.approach)} }} />

**时间复杂度:** 
<div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(problem.explain.timeComplexity.result)} }} />

**空间复杂度:** 
<div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(problem.explain.spaceComplexity.result)} }} />
` : ''}

${problem.explore ? `
    ## 代码细节讲解
    ${problem.explore.map(item => `
    <Callout type="success" title={<div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(item.content)}}} />} emoji='🦆' collapsible>
      <div dangerouslySetInnerHTML={{ __html: ${JSON.stringify(item.explanation)} }} />
      
    </Callout>
    `).join('\n')}
    ` : ''}

${problem.similarQuestions ? `
    ## 相关问题
    <Features>
    ${problem.similarQuestions.map(similarQuestion => `
      <Feature large href="${similarQuestion.path}">
        <h3>${similarQuestion.titleCn ? similarQuestion.titleCn : similarQuestion.titleSlug}</h3>
        <div dangerouslySetInnerHTML={{ __html: ${similarQuestion.contentCn ? JSON.stringify(similarQuestion.contentCn) : JSON.stringify(similarQuestion.titleCn)} }} />
        ${similarQuestion.tagsQ ? Object.keys(similarQuestion.tagsQ).map(tagSlug => tagFilter(tagSlug)).join('\n') : ''}
      </Feature>
    `).join('\n')}
    </Features>
    ` : ''}

`.trim();
}

