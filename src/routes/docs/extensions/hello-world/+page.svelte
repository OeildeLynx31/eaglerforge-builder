<script>
    import CodeBlock from "$lib/DocumentationComponents/codeBlock.svelte";
</script>

<h1>Hello, world!</h1>
<p>Let's start by creating a very simple extension. This extension just adds a block that reports "Hello, world!":</p>
<CodeBlock file="/extensions/hello-world.js" />
<p>Save the code into a file called "hello-world.js".</p>
<p>Now, go to the EaglerBuilder editor, click on the load extension button, and choose the "Custom Extension" option. Go to the File tab and click "Select File". Now find you file and select it. Then click load.</p>
<p>After a second, an extension named "It works!" should appear in the sidebar. If it doesn't appear, open up your developer tools and look for any warnings in the console. Some of the most common errors are:</p>
<ul>
    <li>Syntax error in the JavaScript. This should appear in your browser's developer tools.</li>
    <li>Runtime error in the JavaScript. This should appear in your browser's developer tools</li>
</ul>
<p>Now, we will dissect what is going on in this file in the order it runs.</p>
<h1>Constructing and registering</h1>
<CodeBlock code={"class MyExtension {"} />
<p>This is a standard <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" target="_blank" rel="noopener noreferrer">JavaScript class</a>. It is conventional to define your extension in the form of a class. The name of the class doesn't matter, but we suggest making it somehow based on the extension's name. It doesn't have to be unique at this stage.</p>
<CodeBlock code={"EaglerBuilder.extensions.register(new HelloWorld());"} />
<p>This constructs your class into an object and introduces the special API that allows extensions to function: <code>EaglerBuilder</code>. There's not a lot on <code>EaglerBuilder</code>, but one of the most important functions is <code>EaglerBuilder.extensions.register</code>.</p>
<p>Make sure to always call register() exactly once. If you don't call it, your extension will never get added. If you call it multiple times, an alert will pop up saying the extension has already been loaded.</p>
<h1>info()</h1>
<CodeBlock code={`info() {
    return {
        id: 'helloworld',
        name: 'It works!',
        blocks: [
            {
                id: 'hello',
                type: EaglerBuilder.BlockType.REPORTER,
                text: 'Hello!',
                func: () => {
                    return '"World!"';
                }
            }
        ]
    };
}`} />
<p>When you call register(), EaglerBuilder will then call the info() function on the provided object. This object must return an object with metadata about the extension. Some of the fields are <code>id</code>, <code>name</code>, and <code>blocks</code>. Here's a short summary of those:</p>
<table>
    <thead>
        <tr>
            <th style="text-align: center;"></th>
            <th style="text-align: center;">Type</th>
            <th style="text-align: center;">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: center;">id</td>
            <td style="text-align: center;">string</td>
            <td style="text-align: center;">A unique ID used only by this extension. Multiple extensions cannot share the same ID.</td>
        </tr>
        <tr>
            <td style="text-align: center;">name</td>
            <td style="text-align: center;">string</td>
            <td style="text-align: center;">The name of the extension that appears in the toolbox. If not provided, it will default to the extension id.</td>
        </tr>
        <tr>
            <td style="text-align: center;">blocks</td>
            <td style="text-align: center;">array</td>
            <td style="text-align: center;">A list of objects that describe the blocks in the project.</td>
        </tr>
    </tbody>
</table>
<p>Here's a short summary of what each block should have:</p>
<table>
    <thead>
        <tr>
            <th style="text-align: center;"></th>
            <th style="text-align: center;">Type</th>
            <th style="text-align: center;">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: center;">id</td>
            <td style="text-align: center;">string</td>
            <td style="text-align: center;">A unique ID used only by this block. Multiple blocks cannot share the same ID.</td>
        </tr>
        <tr>
            <td style="text-align: center;">type</td>
            <td style="text-align: center;">EaglerBuilder.BlockType.*</td>
            <td style="text-align: center;">Determines the block's shape. Most commonly EaglerBuilder.BlockType.COMMAND, EaglerBuilder.BlockType.REPORTER, or EaglerBuilder.BlockType.BOOLEAN. See the table below for details.</td>
        </tr>
        <tr>
            <td style="text-align: center;">text</td>
            <td style="text-align: center;">string</td>
            <td style="text-align: center;">The text that will appear in the editor for the block. There is a bit of special syntax here for dealing with arguments that will be discussed in the next segment.</td>
        </tr>
        <tr>
            <td style="text-align: center;">arguments</td>
            <td style="text-align: center;">object</td>
            <td style="text-align: center;">Optional. Discussed in the next section.</td>
        </tr>
        <tr>
            <td style="text-align: center;">func</td>
            <td style="text-align: center;">function</td>
            <td style="text-align: center;">The Function of the block which will return the corresponding code from the Block.</td>
        </tr>
    </tbody>
</table>
<p>These are the acceptable values for type:</p>
<table>
    <thead>
        <tr>
            <th style="text-align: center;"></th>
            <th style="text-align: center;">Description</th>
            <th style="text-align: center;">Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: center;">EaglerBuilder.BlockType.COMMAND</td>
            <td style="text-align: center;">A block that doesn't report a value	</td>
            <td style="text-align: center;">wait 1000 (ms)</td>
        </tr>
        <tr>
            <td style="text-align: center;">EaglerBuilder.BlockType.REPORTER</td>
            <td style="text-align: center;">A round block that usually reports a string or number</td>
            <td style="text-align: center;">current FPS, 'string'</td>
        </tr>
        <tr>
            <td style="text-align: center;">EaglerBuilder.BlockType.BOOLEAN</td>
            <td style="text-align: center;">A block with pointy edges that reports a boolean (true or false)</td>
            <td style="text-align: center;">is key SPACE pressed?</td>
        </tr>
        <tr>
            <td style="text-align: center;">EaglerBuilder.BlockType.EVENT</td>
            <td style="text-align: center;">A block which has Inner Blocks. Discussed later.</td>
            <td style="text-align: center;">when mod loaded do</td>
        </tr>
    </tbody>
</table>
<h1>The blocks</h1>
<CodeBlock code={`(args) => {
    return '"Whatever, ' + args.name + '"';
}`} />
<p>This is a function that will return the code from a block. In this case, our function is very simple and just returns a "Whatever, " following the argument name from the block. Blocks are expected to return a string.</p>
<h1>Excercises</h1>
<p>1. Change the "Whatever," block to return your favorite number instead. Remember to rename the block accordingly.</p>
<p>2. Change the block's id.</p>
<p>3. Add another block. Make this block use a <code>type</code> of <code>EaglerBuilder.BlockType.BOOLEAN</code> and return code which when ran returns a boolean (true or false) at random.</p>
<h1>Next steps</h1>
<p>Next, let's <a href="/docs/extensions/inputs">allow our blocks to take in arguments</a>.</p>