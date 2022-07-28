import { beforeEach, test, expect } from "vitest"
import { cleanup, render } from "@testing-library/svelte"
import Index from './index.svelte'

test("can render", () => {
    console.log('aa')
    render(Index)
})
