import { BoardType } from '@/types/BoardType';
import { ConnectionType } from '@/types/ConnectionType';

export interface ColumnType {
  id: string;
  created_at: string;
  repository: string;
  board_id: BoardType;
  connection_id: ConnectionType;
}
