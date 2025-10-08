import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import styled from "styled-components";


const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const UserButton = styled.button`
  background-color: transparent;
  border: none;
  font-weight: 500;
  font-size: 1rem;
  color: var(--antiflash-white);
  transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover{
        color: var(--vivid-sky-blue); 
        transform: scale(1.05);
    }
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 110%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 10;
`;


export default function UserMenu({ children, userName }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <Container ref={menuRef}>
            <UserButton onClick={() => setOpen(!open)}>
                {user.username} ▼
            </UserButton>

            {open && (
                <Dropdown>
                    {children}
                </Dropdown>
            )}
        </Container>
    );
}