<script>
    import CodeBlock from "$lib/DocumentationComponents/codeBlock.svelte";
</script>

<h1>Events</h1>
<p>Event blocks are for running scripts in response to something. An example of this is "when mod loaded do" - the event is when the mod loads. "every frame do" similarly starts in response to every frame. Event blocks can be used for anything that lets you run a callback or a piece of code (like if conditions).</p>
<p>Event blocks are never actions they are conditions to callbacks. For example, consider this block you're familiar with:</p>
<svg>
    <g transform="translate(-87.61963478915662, -294.04216867469876) scale(0.8012048192771084)">
        <g data-id="gLIO:p=UDJ2,h2Nf+})B" transform="translate(147, 387)">
            <path stroke="#bf8f00" fill="#ffbf00" d=" m 0,22  h 0  c 25,-22  71,-22  96,0  h 74.34375 a 4 4 0 0,1 4,4  v 26  V 30  V 62  V 66 a 4 4 0 0,1 -4,4  H 64  c -2,0  -3,1  -4,2  l -4,4  c -1,1  -2,2  -4,2  h -12  c -2,0  -3,-1  -4,-2  l -4,-4  c -1,-1  -2,-2  -4,-2  h -8 a 4 4 0 0,0 -4,4  v 16 a 4 4 0 0,0 4,4  h 8  c 2,0  3,1  4,2  l 4,4  c 1,1  2,2  4,2  h 12  c 2,0  3,-1  4,-2  l 4,-4  c 1,-1  2,-2  4,-2  H 170.34375 a 4 4 0 0,1 4,4  V 102  V 122 a 4 4 0 0,1 -4,4  h -166.34375 a 4 4 0 0,1 -4,-4 z"></path>
            <g transform="translate(8,36.5)">
                <text dominant-baseline="central" x="0" y="9.5" style="fill: white;font: 700 12pt &quot;Source Code Pro&quot;, monospace;">when&nbsp;mod&nbsp;loaded&nbsp;do</text>
            </g>
        </g>
    </g>
</svg>
<p>When this block is compiled to code and ran it doesnt do anything on its own. We can create our own event block with similar functionality using <code>EaglerBuilder.BlockType.EVENT</code>:</p>
<CodeBlock file="/extensions/when-mod-loaded-do.js" />
<p>The block is defined similar to every other block. Note that it has a second argument in it's function which is the inner blocks compiled to code.</p>
<h1>Excercises</h1>
<p>1. Create an event-based block that runs once every second, another one every 5th second, and another every 10th second.</p>
<p>2. Combine each of those event blocks into one block with a menu.</p>
<p>3. Create a command block and event block and make them be like a message block.</p>
<p>4. Combine each of those event blocks into one block with a menu.</p>