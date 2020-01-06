var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

const LEFT = 0
const RIGHT = 1

class Node {
    constructor(value) {
        this.value = value
        this.children = []
        this.parent = null
        this.pos = { x: 0, y: 0 }
        this.r = 20
    }

    get left() {
        return this.children[LEFT]
    }

    set left(value) {
        value.parent = this
        this.children[LEFT] = value
    }

    get right() {
        return this.children[RIGHT]
    }

    set right(value) {
        value.parent = this
        this.children[RIGHT] = value
    }

    set position(position) {
        this.pos = position
    }

    get position() {
        return this.pos
    }

    get radius() {
        return this.r
    }

}

class Tree {
    constructor() {
        this.root = null;
        this.startPosition = { x: 800, y: 44 }
        this.axisX = 350
        this.axisY = 80

    }

    getPosition({ x, y }, isLeft = false) {
        return { x: isLeft ? x - this.axisX + y : x + this.axisX - y, y: y + this.axisY }
    }

    add(value) {
        const newNode = new Node(value);
        if (this.root == null) {
            newNode.position = this.startPosition
            this.root = newNode
        }
        else {
            let node = this.root
            while (node) {
                if (node.value == value)
                    break;
                if (value > node.value) {
                    if (node.right == null) {
                        newNode.position = this.getPosition(node.position)
                        node.right = newNode
                        break;
                    }
                    node = node.right
                }
                else {
                    if (node.left == null) {
                        newNode.position = this.getPosition(node.position, true)
                        node.left = newNode
                        break;
                    }
                    node = node.left
                }
            }
        }
    }

    all(node) {
        if (node === undefined)
            return
        else {
            console.log(node.value)
            this.all(node.left)
            this.all(node.right)
        }
    }

    getAll() {
        this.all(this.root)
    }

    bfs() {
        const queue = [];
        const black = "#000"

        queue.push(this.root);

        while (queue.length !== 0) {
            const node = queue.shift();
            const { x, y } = node.position

            const color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
            ctx.beginPath();
            ctx.arc(x, y, node.radius, 0, 2 * Math.PI)
            ctx.strokeStyle = black
            ctx.fillStyle = color
            ctx.fill()
            ctx.stroke()
            ctx.strokeStyle = black
            ctx.strokeText(node.value, x, y)


            node.children.forEach(child => {

                const { x: x1, y: y1 } = child.position;
                ctx.beginPath();
                ctx.moveTo(x, y + child.radius);
                ctx.lineTo(x1, y1 - child.radius)
                ctx.stroke();
                queue.push(child)
            });

        }
    }

}

const t = new Tree();
t.add(10)
t.add(5)
t.add(15)
t.add(3)
t.add(14)
t.add(16)
t.add(4)
t.add(6)
t.add(2)
t.bfs()