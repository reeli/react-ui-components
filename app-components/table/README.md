设计思路:

1. 将 UI 和数据结构对应起来，找出 repeat 的方式 ( repeat列 还是 repeat行)
2. 如果是横向 repeat, 则遵循流式布局，横向 render 每一个 item，这样才能保证一行中某几列高度不一致时，每一行仍然能对齐
3. 如果是横向 repeat, 则总共循环 dataSource.length 次。如果此时采用纵向 repeat 的方式，则每一列都将循环 dataSource.length 次，总共循环 dataSource.length * 列数次，增加复杂度
