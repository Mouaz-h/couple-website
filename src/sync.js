import Gun from 'gun/gun';
import 'gun/sea';

// Connect to a public peer for real-time synchronization
const gun = Gun({
  peers: [
    'https://gun-manhattan.herokuapp.com/gun',
    'https://p2p.xyz/gun'
  ]
});

// A unique key for your shared couple list to keep it private from other users
const SHARE_KEY = 'mouaz-and-nahed-forever-dreams-v1';

export const db = gun.get(SHARE_KEY);
export default gun;
