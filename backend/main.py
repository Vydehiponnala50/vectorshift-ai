from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, Dict, List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


def check_is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    node_ids = {node['id'] for node in nodes}
    graph: Dict[str, List[str]] = {nid: [] for nid in node_ids}

    for edge in edges:
        src = edge.get('source', '')
        tgt = edge.get('target', '')
        if src in graph:
            graph[src].append(tgt)

    visited: set = set()
    rec_stack: set = set()

    def has_cycle(node_id: str) -> bool:
        visited.add(node_id)
        rec_stack.add(node_id)
        for neighbor in graph.get(node_id, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True
        rec_stack.discard(node_id)
        return False

    for nid in node_ids:
        if nid not in visited:
            if has_cycle(nid):
                return False
    return True


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag = check_is_dag(pipeline.nodes, pipeline.edges)
    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
