<script>
    import { onMount } from 'svelte';
    import Prism from 'prismjs';
    import beautify from "js-beautify";
    export let title = "";
    export let code = ``;
    export let file = "";

    function highlight(code) {
        const beautified = beautify.js(code, {
            indent_size: 4,
            space_in_empty_paren: true,
        });
        const highlighted = Prism.highlight(
            beautified,
            Prism.languages.javascript
        );
        return highlighted;
    }

    onMount(async () => {
        if (file) {
            code = await (await fetch(file)).text();
            title = file.split("/")[file.split("/").length - 1];
        }
    })
</script>

<div class="code-wrapper">
    {#if title}
        <p class="title">{title}</p>
        <hr>
    {/if}
    {#each code.split("\n") as line,i}
        <div class="line">{#if title}<span class="line-count" style="width: {Math.floor(code.split("\n").length.toString().length) * 10}px;">{i + 1}</span>{/if} <code class="code-line language-javascript">{@html highlight(line)}</code></div>
    {/each}
</div>

<style>
    .code-line {
        border-radius: 0;
        white-space: pre;
        border: none;
    }
    .line-count {
        font-family: Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;
        color: lightgray;
        text-align: right;
        padding-right: 5px;
        display: inline-block;
        user-select: none;
    }
    :global(body.dark) .line-count {
        color: gray;
    }
    .line {
        display: block;
    }
    .title {
        margin: 0;
        padding: .75rem;
        font-size: 90%;
    }
    hr {
        width: calc(100% + 17px);
        position: relative;
        left: -10px;
        margin-bottom: 10px;
    }
    .code-wrapper {
        padding: 10px;
        background: #f5f2f0;
        border-radius: 5px;
    }
    :global(body.dark) .code-wrapper {
        background: #2d2d2d;
    }
</style>