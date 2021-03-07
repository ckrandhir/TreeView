import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FileNode {
  name: string;
  children?: FileNode[];
}

const TREE_DATA: FileNode[] = [
  {
    name: 'dir1',
    children: [
      {
        name: 'dirx',
        children: [{ name: 'file.ext' }, { name: 'file1.ext' }],
      },
      {
        name: 'file2.ext',
      },
    ],
  },

  {
    name: 'dir2',
    children: [
      {
        name: 'diry',
        children: [{ name: 'file3.ext' }],
      },
    ],
  },
  {
    name: 'dir3',
    children: [
      {
        name: 'dirz',
        children: [{ name: 'file4.ext' }],
      },
    ],
  },

  {
    name: 'dir4',
    children: [
      {
        name: 'dira',
        children: [{ name: 'file5.ext' }],
      },
    ],
  },

  {
    name: 'dir5',
    children: [
      {
        name: 'dirb',
        children: [{ name: 'file6.ext' }],
      },
    ],
  },

  {
    name: 'dir6',
    children: [
      {
        name: 'dir0',
        children: [
          { name: 'file7.ext' },
          { name: 'file7.ext' },
          { name: 'file7.ext' },
        ],
      },
    ],
  },

  {
    name: 'file10.ext',
  },

  {
    name: 'dir7',
    children: [
      {
        name: 'dirv',
        children: [{ name: 'file11.ext' }],
      },
      {
        name: 'dire',
      },
      {
        name: 'dirc',
        children: [{ name: 'file12.ext' }],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent {
  private _transformer = (node: FileNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
