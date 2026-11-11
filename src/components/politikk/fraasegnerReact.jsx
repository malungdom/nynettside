import { useState, useEffect } from "react";
import '../../styles/globals.css';
import styles from './fraasegner.module.css';

export default function FraasegnListe({ fraasegner }) {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');

    function handleClick(fraasegnText) {
        setText(fraasegnText.rendered.html);
        setTitle(fraasegnText.data.title);
        setOpen(true);
        document.body.style.overflow = 'hidden';
    }
    const handleClose = () => {
        setOpen(false);
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }

    useEffect(() => {
        let i = 0;
        for (let [i, fraasegn] of fraasegner.entries()) {
            const btn = document.getElementById(`stmt-${i}`)
            if (!btn) break;
            
            btn.addEventListener('click', () => handleClick(fraasegn))
        }
    }, []);

    return ( 
        <>
            <div style={{
                'display': 'flex', 
                'justify-content': 'center', 
                'align-items': 'center', 
                'width': '100%',
                'height': '100%',
                'position': 'fixed', 
                'transform': 'translateY(-8rem)', 
                pointerEvents: open ? 'auto' : 'none', 
                'z-index': '100',
                }}>
                <div
                    id= 'blocker'
                    onClick={() => handleClose()}
                    style={{
                        opacity: open ? 1 : 0,
                        // Hidden once closed so the full-screen blur layer isn't re-rendered on every repaint underneath it
                        visibility: open ? 'visible' : 'hidden',
                        position: 'fixed',
                        inset: 0,
                        zIndex: 101,
                        width: '100%',
                        backdropFilter: open ? 'blur(2px)' : 'none',
                        transition: open
                            ? 'backdrop-filter 0.3s ease, background-color 0.3s ease, opacity 0.3s ease, visibility 0s'
                            : 'backdrop-filter 0.3s ease, background-color 0.3s ease, opacity 0.3s ease, visibility 0s linear 0.3s',
                    }}
                />
                <div className={styles.fraasegnCard} style={{
                    zIndex: '101',
                    transform: open ? 'translateY(3dvh) translate(-50%, -50%) ' : 'translate(-50%, 100vh)',
                    visibility: open ? 'visible' : 'hidden',
                    transition: open ? 'transform 0.3s ease, visibility 0s' : 'transform 0.3s ease, visibility 0s linear 0.3s',
                }}
                onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => handleClose()}>
                        <div style={{zIndex: 105, 'position': 'fixed', 'transform': 'translate(-1.2rem, -2.3rem)', 'background-color': '#ff8383', 'padding': '0 0.6rem 0 0.6rem', 'color': 'white', 'border-radius': '0.3rem', 'font-size': '1.5rem'}}>
                            X
                        </div>
                    </button>
                    <div style={{'overflowY': 'auto', 'height': '90%', 'max-height': '90vh'}}>
                        <div style={{'display': 'flex', 'justify-content': 'center'}}>
                            <div style={{'width': '80%', 'margin-top': '3rem', 'margin-bottom': '3rem'}}>
                                <h1>{title}</h1>
                                <div style={{'font-size': 'var(--font-body)'}} dangerouslySetInnerHTML={{__html: text}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}