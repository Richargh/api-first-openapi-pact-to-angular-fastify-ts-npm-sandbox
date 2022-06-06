export const mochaHooks = {
    async beforeAll(): Promise<void> {
        console.info("Before all");
    }
}
