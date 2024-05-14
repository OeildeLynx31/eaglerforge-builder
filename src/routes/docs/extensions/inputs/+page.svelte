<script>
    import CodeBlock from "$lib/DocumentationComponents/codeBlock.svelte";
</script>

<h1>Dealing with inputs</h1>
<p>Often you will want your blocks to take something in as an "input", "argument", or "parameter". Let's learn how to do that with a new example:</p>
<CodeBlock file="/extensions/nor.js"/>
<p>Save this code to a file called "nor.js" beside "hello-world.js", and load it the same way you loaded the hello world extension. Most of the code is very similar to the hello world extension. Notice that the nor block in this extension will be false if any of the inputs are true but be true when none are true.</p>
<p>Now let's talk about the arguments.</p>
<p>To add arguments to a block, you give it an <code>arguments</code> property. It should be set to an object that contains other objects. Each property you put in <code>arguments</code> corresponds to a single argument. Each one has a name. The names can be all capitals or any format you desire.</p>
<p>Here's a summary of the most common properties to set for an argument:</p>
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
            <td style="text-align: center;">type</td>
            <td style="text-align: center;">EaglerBuilder.ArgumentType.*</td>
            <td style="text-align: center;">Determines the shape of the input and what it accepts. See the table below for acceptable values.</td>
        </tr>
        <tr>
            <td style="text-align: center;">default</td>
            <td style="text-align: center;">string</td>
            <td style="text-align: center;">Optional. The default value in the toolbox. Unique to inputs with type EaglerBuilder.ArgumentType.STRING and EaglerBuilder.ArgumentType.NUMBER.</td>
        </tr>
        <tr>
            <td style="text-align: center;">menu</td>
            <td style="text-align: center;">string</td>
            <td style="text-align: center;">Unique to inputs with type EaglerBuilder.ArgumentType.MENU. Discussed later.</td>
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
            <td style="text-align: center;">EaglerBuilder.ArgumentType.STRING</td>
            <td style="text-align: center;">Any text</td>
            <td style="text-align: center;">apple, 123, true</td>
        </tr>
        <tr>
            <td style="text-align: center;">EaglerBuilder.ArgumentType.NUMBER</td>
            <td style="text-align: center;">Any number</td>
            <td style="text-align: center;">123</td>
        </tr>
        <tr>
            <td style="text-align: center;">EaglerBuilder.ArgumentType.BOOLEAN</td>
            <td style="text-align: center;">True or false</td>
            <td style="text-align: center;">true</td>
        </tr>
        <tr>
            <td style="text-align: center;">EaglerBuilder.ArgumentType.MENU</td>
            <td style="text-align: center;">An input with a menu (dropdown)</td>
            <td style="text-align: center;">ANY</td>
        </tr>
    </tbody>
</table>
<p>Next, EaglerBuilder needs to know where to put each of the arguments in the block. Are they at the start, end, or somewhere in the middle? It can't guess, so you have to tell it. To do this, you use the <code>text</code> property on the block by using <code>[ARGUMENT_NAME]</code> syntax to denote where each input goes. Each argument in the <code>arguments</code> object should appear in <code>text</code> exactly once. Arguments can be in any order, it doesn't matter.</p>
<p>When EaglerBuilder runs your block functions and compiles your blocks, it will pass in an object for the first value. This object will contain a value for each argument name that the block has. Conventionally we call this <code>args</code> or use destructuring syntax. As an example, if the block has an argument named <code>X</code> and <code>Y</code>, these could be accessed in any of these ways:</p>
<CodeBlock code={`// Using args.XYZ format...
function(args) {
    console.log(args.X, args.Y);
}

// Or using destructuring...
function({X, Y}) {
    console.log(X, Y);
}`} />
<p>Arguments are always provided as a string because they are another snippet of code.</p>
<h1>Menus</h1>
<p>Sometimes you might prefer your blocks to have a dropdown. These are called menus.</p>
<CodeBlock file="/extensions/strings-1.js"/>
<p>To make an argument into a menu, set its <code>type</code> to <code>EaglerBuilder.ArgumentType.MENU</code> and set its <code>menu</code> property to the name of the menu. This corresponds to a new property in the object returned by info(): <code>menus</code>.</p>
<p><code>menus</code> is an array of strings / objects. Each item in <code>menus</code> is typically a string or object with these properties:</p>
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
            <td style="text-align: center;">text</td>
            <td style="text-align: center;">string</td>
            <td style="text-align: center;">The Text shown in the dropdown.</td>
        </tr>
        <tr>
            <td style="text-align: center;">value</td>
            <td style="text-align: center;">string</td>
            <td style="text-align: center;">The Text returned from the argument.</td>
        </tr>
    </tbody>
</table>
<CodeBlock file="/extensions/strings-2.js"/>
<p>Notice that, although the dropdown displays UPPERCASE in the editor, the block actually receives "up".</p>
<h1>Excercises</h1>
<p>1. Add a block that does the same thing as the built-in "join" block. It should take two arguments and produce a new string joining them together. Make sure your block casts the arguments to strings so when someone runs "join ((1 + 2)) ((3 + 4))" they get "(1 + 2)(3 + 4)" not 10.</p>
<p>2. Create a boolean block that takes a number argument and a menu argument with the options "odd" and "even". The block should return whether the given number is either odd or even, as the menu says.</p>
<h1>Next steps</h1>
<p>Next, let's see <a href="/docs/extensions/events">how to make blocks like "every frame do" or "when mod loaded do"</a>.</p>