export function prepareRoot(parent, id = "app") {
    assert(parent, "\"parent\" argument is required");
    assert(parent instanceof HTMLElement, "\"parent\" argument must be an HTMLElement type");

    let root = document.createElement("div");
    root.id = id;
    parent.appendChild(root);

    return root;
}


export function assert(test, message = "") {
    if (!test) {
        throw new Error(message);
    }
}


export function assertNumber(value, prefix = "") {
    assert(typeof value === "number", `${prefix} must be a number"`);
}
