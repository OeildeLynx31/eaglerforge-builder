<script>
    // Components
    import NavigationBar from "$lib/NavigationBar/NavigationBar.svelte";

    // Variables
    let ceOpen = false;
</script>

<NavigationBar>
</NavigationBar>
<div class="main">
    <div class="sidebar">
        <h3 class="title">EaglerBuilder Docs</h3>
        <a class="link" href="/docs/">Intro</a>
        <p class="link ce" style={ceOpen ? "--rot: 180deg" : "--rot: 90deg"} on:click={() => {ceOpen = !ceOpen}}>Custom Extensions</p>
        <div class="innerlinks" style={!ceOpen ? "height: 0px;" : "height: 100%;"}>
            <a class="link" href="/docs/extensions/">Overview</a>
            <a class="link" href="/docs/extensions/hello-world">Hello, world!</a>
            <a class="link" href="/docs/extensions/inputs">Dealing with inputs</a>
            <a class="link" href="/docs/extensions/events">Events</a>
        </div>
    </div>
    <div class="content">
        <slot />
    </div>
</div>

<style>
    :root {
        --nav-height: 3rem;
    }

    .main {
        position: absolute;
        left: 0px;
        top: var(--nav-height);
        width: 100%;
        height: calc(100% - var(--nav-height));

        min-width: 870px;
    }

    .sidebar {
        width: 200px;
        position: fixed;
        left: 0;
        top: var(--nav-height);
        padding-top: 0px;
        padding-left: 10px;
        height: 100%;
        background-color: rgb(240, 240, 240);
        border-right: solid 4px rgb(220, 220, 220);
    }

    :global(body.dark) .sidebar {
        background-color: rgb(30, 30, 30);
        border-right: solid 4px rgb(40, 40, 40);
    }

    .content {
        margin-left: 240px;
        margin-right: 12px;
        padding-bottom: 5px;
    }

    .title {
        width: calc(100% + 0px);
        text-align: left;
        position: relative;
    }
    
    .link {
        color: inherit;
        display: block;
        width: calc(100% - 20px);
        border-radius: 5px;
        padding: 5px;
        margin: 0;
        cursor: pointer;
    }

    .link:hover {
        background: rgba(0,0,0,.05);
        text-decoration: none;
    }

    :global(body.dark) .link:hover {
        background: hsla(0,0%,100%,.05);
    }

    .ce::after {
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"><path fill="rgba(0,0,0,0.5)" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>') 50%/2rem 2rem;
        margin-left: 5px;
        min-width: 1.25rem;
        content: "";
        height: 1rem;
        transform: rotate(var(--rot));
        transition: transform 200ms linear;
        width: 1.25rem;
        filter: invert(100%) sepia(94%) saturate(17%) hue-rotate(223deg) brightness(104%) contrast(98%);
        display: inline-block;
        position: relative;
        top: 2px;
    }

    .innerlinks {
        position: relative;
        left: 10px;
        width: calc(100% - 10px);
        will-change: height;
        transition: height 326ms ease-in-out 0s;
        display: block;
        overflow: hidden;
    }

    :global(code) {
        background-color: hsla(0,0%,100%,.1);
        border: .1rem solid rgba(0,0,0,.1);
        border-radius: 0.4rem;
        font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
        font-size: 90%;
        padding: 0.1rem;
    }

    /* Style the table */
:global(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

/* Style table header */
:global(th) {
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 18px;
}

/* Style table cells */
:global(td) {
  border: 1px solid #ddd;
  padding: 18px;
}

/* Style even rows */
:global(tr:nth-child(even)) {
  background-color: #f2f2f2;
}
/* Style the table for dark mode */
:global(body.dark) :global(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

/* Style table header for dark mode */
:global(body.dark) :global(th) {
  background-color: #333; /* Dark background color */
  color: #fff; /* Light text color */
  border: 1px solid #555; /* Dark border color */
  padding: 18px;
}

/* Style table cells for dark mode */
:global(body.dark) :global(td) {
  border: 1px solid #555; /* Dark border color */
  padding: 18px;
}

/* Style even rows for dark mode */
:global(body.dark) :global(tr:nth-child(even)) {
  background-color: #444; /* Dark background color */
}

</style>
