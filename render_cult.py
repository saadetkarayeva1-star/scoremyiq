from PIL import Image, ImageDraw, ImageFont
import os

BG      = (14, 12, 10)
TEXT    = (242, 237, 230)
ACCENT  = (139, 32, 32)
MUTED   = (107, 100, 96)
DIM     = (160, 152, 144)
BORDER  = (42, 37, 34)
SURFACE = (20, 18, 16)

SR  = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"
SI  = "/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf"
MR  = "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf"

def F(p, s): return ImageFont.truetype(p, s)

PW, PH = 300, 580
GAP = 28
COLS = 3
PAD = 36

W = PAD*2 + COLS*PW + (COLS-1)*GAP
H = PAD*2 + 80 + 3*(PH + GAP + 30)

canvas = Image.new("RGB", (W, H), (10, 8, 7))
D = ImageDraw.Draw(canvas)


def hl(x, y, w=None, c=BORDER):
    if w is None: w = PW
    D.line([(x, y), (x + w, y)], fill=c, width=1)

def vl(x, y, h, c=BORDER):
    D.line([(x, y), (x, y + h)], fill=c, width=1)

def box(x1, y1, x2, y2, fill=None, outline=None):
    D.rectangle([x1, y1, x2, y2], fill=fill, outline=outline)

def t(x, y, s, f, c):
    D.text((x, y), s, font=f, fill=c)

def ct(x, y, w, s, f, c):
    sw = int(D.textlength(s, font=f))
    D.text((x + (w - sw) // 2, y), s, font=f, fill=c)

def wrap(text, f, max_w):
    words = text.split()
    lines, line = [], ""
    for w in words:
        test = line + (" " if line else "") + w
        if D.textlength(test, font=f) < max_w:
            line = test
        else:
            lines.append(line)
            line = w
    lines.append(line)
    return lines

def frame(x, y):
    box(x, y, x + PW - 1, y + PH - 1, fill=BG, outline=BORDER)
    t(x + 12, y + 8, "9:41", F(MR, 7), MUTED)
    t(x + PW - 30, y + 8, "●●●", F(MR, 7), MUTED)

def tagbox(x, y, text, active=False):
    f = F(MR, 6)
    tw = int(D.textlength(text, font=f))
    bw = tw + 10
    if active:
        box(x, y, x + bw, y + 13, fill=TEXT)
        t(x + 5, y + 3, text, f, BG)
    else:
        box(x, y, x + bw, y + 13, outline=BORDER)
        t(x + 5, y + 3, text, f, MUTED)
    return bw + 4

def nav_bar(x, y, active_i):
    hl(x, y)
    items = [("◈", "FEED"), ("◇", "EVENTS"), ("○", "PROFILE")]
    nw = PW // 3
    for i, (icon, lbl) in enumerate(items):
        nx = x + i * nw + nw // 2
        ac = (i == active_i)
        t(nx - 6, y + 8, icon, F(MR, 12), TEXT if ac else MUTED)
        lw = int(D.textlength(lbl, font=F(MR, 6)))
        t(nx - lw // 2, y + 26, lbl, F(MR, 6), TEXT if ac else MUTED)

def circle_msg(x, y, msg):
    D.line([(x + 16, y), (x + 16, y + 42)], fill=ACCENT, width=1)
    t(x + 24, y, "THE CIRCLE", F(MR, 6), ACCENT)
    lines = wrap(msg, F(SR, 10), PW - 52)
    for j, l in enumerate(lines):
        t(x + 24, y + 12 + j * 14, l, F(SR, 10), TEXT)
    return y + max(44, len(lines) * 14 + 18)


# ─── SPLASH ───────────────────────────────────────────────
def draw_splash(x, y):
    frame(x, y)
    lf = F(SR, 28)
    lw = int(D.textlength("CULT", font=lf))
    lx = x + (PW - lw) // 2
    t(lx, y + 130, "CULT", lf, TEXT)
    D.line([(lx - 14, y + 164), (lx + lw + 14, y + 164)], fill=TEXT, width=1)
    tf = F(SI, 12)
    tw = int(D.textlength("Members only.", font=tf))
    t(x + (PW - tw) // 2, y + 196, "Members only.", tf, DIM)
    sf = F(MR, 8)
    sw = int(D.textlength("LOS ANGELES.", font=sf))
    t(x + (PW - sw) // 2, y + 216, "LOS ANGELES.", sf, MUTED)
    box(x + 20, y + 278, x + PW - 20, y + 304, fill=TEXT)
    ct(x + 20, y + 287, PW - 40, "REQUEST ACCESS", F(MR, 7), BG)
    gt = "sign in"
    gtw = int(D.textlength(gt, font=sf))
    t(x + (PW - gtw) // 2, y + 322, gt, sf, MUTED)
    ft = "INVITE ONLY"
    ftw = int(D.textlength(ft, font=sf))
    t(x + (PW - ftw) // 2, y + PH - 32, ft, sf, MUTED)


# ─── ONBOARDING ───────────────────────────────────────────
def draw_onboarding(x, y):
    frame(x, y)
    lf = F(SR, 13)
    lw = int(D.textlength("CULT", font=lf))
    t(x + 16, y + 26, "CULT", lf, TEXT)
    hl(x + 16, y + 42, lw)
    t(x + 16, y + 72, "02", F(MR, 8), ACCENT)
    t(x + 16, y + 96, "By referral", F(SR, 22), TEXT)
    t(x + 16, y + 122, "only.", F(SR, 22), TEXT)
    hl(x + 16, y + 158, 36, ACCENT)
    body = "Every member is vouched for. Every introduction is intentional."
    lines = wrap(body, F(MR, 9), PW - 40)
    for j, l in enumerate(lines):
        t(x + 16, y + 172 + j * 16, l, F(MR, 9), DIM)
    dy = y + PH - 90
    D.line([(x + 16, dy), (x + 32, dy)], fill=BORDER, width=1)
    D.line([(x + 38, dy), (x + 70, dy)], fill=TEXT, width=1)
    D.line([(x + 76, dy), (x + 92, dy)], fill=BORDER, width=1)
    box(x + 16, y + PH - 72, x + PW - 16, y + PH - 46, fill=TEXT)
    ct(x + 16, y + PH - 64, PW - 32, "NEXT", F(MR, 7), BG)


# ─── APPLY ────────────────────────────────────────────────
def draw_apply(x, y):
    frame(x, y)
    t(x + 16, y + 28, "← back", F(MR, 8), MUTED)
    lf = F(SR, 12)
    lw = int(D.textlength("CULT", font=lf))
    lcx = x + (PW - lw) // 2
    t(lcx, y + 28, "CULT", lf, TEXT)
    hl(lcx, y + 42, lw)
    hl(x, y + 58)
    t(x + 16, y + 66, "Request Access", F(SR, 18), TEXT)
    t(x + 16, y + 90, "We don't accept everyone.", F(MR, 8), MUTED)
    hl(x + 16, y + 108, PW - 32, BORDER)
    fields = [("FULL NAME", "Valentina Cruz"), ("INSTAGRAM", "@valentina.cr"), ("CITY", "Silver Lake")]
    fy = y + 118
    for lb, val in fields:
        t(x + 16, fy, lb, F(MR, 7), MUTED)
        t(x + 16, fy + 12, val, F(MR, 9), TEXT)
        hl(x + 16, fy + 28, PW - 32, BORDER)
        fy += 44
    t(x + 16, fy, "WHAT BEST DESCRIBES YOU?", F(MR, 7), MUTED)
    fy += 12
    roles = ["MODEL", "CREATIVE DIR.", "PHOTOGRAPHER", "STYLIST", "INFLUENCER"]
    tx = x + 16
    for i, r in enumerate(roles):
        bw = tagbox(tx, fy, r, active=(i < 2))
        tx += bw
        if tx > x + PW - 60:
            tx = x + 16
            fy += 18


# ─── HOME FEED ────────────────────────────────────────────
def draw_feed(x, y):
    frame(x, y)
    lf = F(SR, 17)
    lw = int(D.textlength("CULT", font=lf))
    t(x + (PW - lw) // 2, y + 26, "CULT", lf, TEXT)
    box(x + PW - 26, y + 29, x + PW - 20, y + 35, fill=ACCENT)
    t(x + PW - 30, y + 29, "⊙", F(MR, 10), MUTED)
    hl(x, y + 50)
    tabs = [("COLLAB", True), ("EVENTS", False), ("MEET", False)]
    tx = x + 16
    for tab, ac in tabs:
        tf = F(MR, 7)
        tw = int(D.textlength(tab, font=tf))
        t(tx, y + 60, tab, tf, TEXT if ac else MUTED)
        if ac:
            hl(tx, y + 76, tw)
        tx += tw + 18
    hl(x, y + 77)
    t(x + 16, y + 86, "Collaborations", F(SR, 13), TEXT)
    t(x + PW - 34, y + 89, "+ POST", F(MR, 6), ACCENT)
    # Card 1
    cy = y + 106
    box(x + 12, cy, x + PW - 12, cy + 106, outline=BORDER)
    box(x + 20, cy + 7, x + 36, cy + 23, fill=SURFACE, outline=BORDER)
    t(x + 22, cy + 11, "VC", F(SR, 8), MUTED)
    t(x + 40, cy + 8, "Valentina Cruz", F(MR, 8), TEXT)
    t(x + 40, cy + 19, "Model / Creative · 2h ago", F(MR, 6), MUTED)
    box(x + PW - 52, cy + 7, x + PW - 18, cy + 18, outline=BORDER)
    t(x + PW - 50, cy + 9, "COLLAB", F(MR, 6), MUTED)
    hl(x + 12, cy + 28, PW - 24, BORDER)
    t(x + 20, cy + 34, "Looking for a film photographer", F(SR, 10), TEXT)
    t(x + 20, cy + 50, "Shooting in Malibu next week.", F(MR, 7), DIM)
    t(x + 20, cy + 61, "Film only. Doesn't over-direct.", F(MR, 7), DIM)
    tagbox(x + 20, cy + 75, "PHOTOGRAPHY")
    tagbox(x + 112, cy + 75, "FILM")
    hl(x + 12, cy + 93, PW - 24, BORDER)
    t(x + 20, cy + 97, "14 saved", F(MR, 7), MUTED)
    box(x + PW - 58, cy + 93, x + PW - 16, cy + 106, outline=TEXT)
    ct(x + PW - 58, cy + 96, 42, "RESPOND", F(MR, 6), TEXT)
    # Card 2
    cy2 = cy + 114
    box(x + 12, cy2, x + PW - 12, cy2 + 76, outline=BORDER)
    box(x + 20, cy2 + 7, x + 36, cy2 + 23, fill=SURFACE, outline=BORDER)
    t(x + 22, cy2 + 11, "SP", F(SR, 8), MUTED)
    t(x + 40, cy2 + 8, "Sloane Park", F(MR, 8), TEXT)
    t(x + 40, cy2 + 19, "Stylist · 5h ago", F(MR, 6), MUTED)
    hl(x + 12, cy2 + 28, PW - 24, BORDER)
    t(x + 20, cy2 + 34, "Stylist open for editorial", F(SR, 10), TEXT)
    t(x + 20, cy2 + 50, "Available March–April.", F(MR, 7), DIM)
    tagbox(x + 20, cy2 + 64, "STYLING")
    tagbox(x + 84, cy2 + 64, "PAID")
    hl(x + 12, cy2 + 70, PW - 24, BORDER)
    t(x + 20, cy2 + 73, "28 saved", F(MR, 7), MUTED)
    box(x + PW - 58, cy2 + 69, x + PW - 16, cy2 + 78, outline=TEXT)
    ct(x + PW - 58, cy2 + 71, 42, "RESPOND", F(MR, 6), TEXT)
    nav_bar(x, y + PH - 48, 0)


# ─── EVENTS ───────────────────────────────────────────────
def draw_events(x, y):
    frame(x, y)
    t(x + 16, y + 26, "Events", F(SR, 20), TEXT)
    t(x + 16, y + 52, "MEMBERS ONLY  ·  LOS ANGELES", F(MR, 7), MUTED)
    hl(x, y + 66)
    t(x + 16, y + 74, "ALL", F(MR, 8), TEXT)
    t(x + 56, y + 74, "OPEN", F(MR, 8), MUTED)
    hl(x + 16, y + 88, int(D.textlength("ALL", font=F(MR, 8))))
    hl(x, y + 89)
    events = [
        ("Mar", "22", "Private screening + dinner", "7 PM · West Hollywood", "3 SPOTS LEFT", False),
        ("Mar", "25", "Studio open house", "4 PM · Los Feliz", "3 SPOTS LEFT", False),
        ("Mar", "30", "CULT breakfast", "10 AM · Silver Lake", "FULL", True),
    ]
    ey = y + 100
    for mo, day, title, meta, status, full in events:
        box(x + 12, ey, x + PW - 12, ey + 60, outline=BORDER)
        t(x + 18, ey + 8, mo.upper(), F(MR, 6), MUTED)
        t(x + 16, ey + 18, day, F(SR, 16), TEXT)
        t(x + 54, ey + 8, title, F(SR, 10), TEXT)
        t(x + 54, ey + 24, meta, F(MR, 7), MUTED)
        t(x + 54, ey + 38, status, F(MR, 7), MUTED if full else ACCENT)
        t(x + PW - 24, ey + 20, "›", F(MR, 14), MUTED)
        ey += 68
    nav_bar(x, y + PH - 48, 1)


# ─── PROFILE ──────────────────────────────────────────────
def draw_profile(x, y):
    frame(x, y)
    box(x + 14, y + 24, x + 66, y + 76, fill=SURFACE, outline=BORDER)
    t(x + 24, y + 38, "VC", F(SR, 18), MUTED)
    t(x + 76, y + 26, "Valentina Cruz", F(SR, 14), TEXT)
    t(x + 76, y + 46, "@valentina", F(MR, 8), MUTED)
    box(x + 76, y + 60, x + 76 + 88, y + 74, outline=BORDER)
    t(x + 80, y + 62, "MODEL / CREATIVE", F(MR, 6), MUTED)
    hl(x, y + 88)
    t(x + 14, y + 96, "Silver Lake  ·  @valentina.cr", F(MR, 7), MUTED)
    t(x + 14, y + 110, "verified", F(MR, 7), ACCENT)
    hl(x, y + 126)
    t(x + 14, y + 134, "I make things. I wear things.", F(SI, 11), TEXT)
    t(x + 14, y + 150, "Sometimes both at once.", F(SI, 11), TEXT)
    hl(x, y + 170)
    stats = [("8", "COLLABS"), ("12", "EVENTS"), ("6", "MEETS")]
    sw = PW // 3
    for i, (val, lbl) in enumerate(stats):
        sx = x + i * sw
        ct(sx, y + 182, sw, val, F(SR, 18), TEXT)
        ct(sx, y + 206, sw, lbl, F(MR, 6), MUTED)
        if i < 2:
            vl(sx + sw, y + 178, 40)
    hl(x, y + 226)
    box(x + 14, y + 236, x + PW - 14, y + 258, fill=TEXT)
    ct(x + 14, y + 244, PW - 28, "EDIT PROFILE", F(MR, 7), BG)
    hl(x, y + 268)
    t(x + 14, y + 276, "ACCOUNT", F(MR, 7), MUTED)
    items = ["Privacy settings", "Notification preferences", "Strike history", "Sign out"]
    for i, item in enumerate(items):
        iy = y + 292 + i * 34
        t(x + 14, iy, item, F(MR, 8), TEXT)
        t(x + PW - 20, iy, "›", F(MR, 9), MUTED)
        if i < 3:
            hl(x + 14, iy + 18, PW - 28, BORDER)
    nav_bar(x, y + PH - 48, 2)


# ─── THE CIRCLE ───────────────────────────────────────────
def draw_circle(x, y):
    frame(x, y)
    t(x + 14, y + 28, "← back", F(MR, 7), MUTED)
    ct_str = "The Circle"
    cw = int(D.textlength(ct_str, font=F(SI, 13)))
    t(x + (PW - cw) // 2, y + 28, ct_str, F(SI, 13), TEXT)
    hl(x, y + 46)
    my = y + 58
    my = circle_msg(x, my, "I've found someone worth your time.")
    my = circle_msg(x, my, "Her name is Mia Fontaine. Photographer. Echo Park.")
    my = circle_msg(x, my, "I need to ask you a few things. Your answers go to her.")
    box(x + 12, my + 4, x + PW - 12, my + 80, outline=BORDER)
    box(x + 20, my + 12, x + 58, my + 50, fill=SURFACE, outline=BORDER)
    t(x + 28, my + 22, "MF", F(SR, 14), MUTED)
    t(x + 66, my + 14, "Mia Fontaine", F(SR, 11), TEXT)
    t(x + 66, my + 30, "PHOTOGRAPHER", F(MR, 6), MUTED)
    t(x + 20, my + 56, '"Film. The moments between."', F(SI, 8), DIM)
    btn_y = my + 92
    if btn_y + 26 < y + PH - 30:
        box(x + 14, btn_y, x + PW - 14, btn_y + 26, fill=TEXT)
        ct(x + 14, btn_y + 8, PW - 28, "I'M READY", F(MR, 7), BG)
    gt = "not now"
    gtw = int(D.textlength(gt, font=F(MR, 7)))
    if btn_y + 36 < y + PH - 16:
        t(x + (PW - gtw) // 2, btn_y + 36, gt, F(MR, 7), MUTED)


# ─── CHAT ─────────────────────────────────────────────────
def draw_chat(x, y):
    frame(x, y)
    t(x + 14, y + 28, "←", F(MR, 10), MUTED)
    t(x + 32, y + 26, "Mia Fontaine", F(SR, 12), TEXT)
    t(x + 32, y + 44, "Photographer · Echo Park", F(MR, 7), MUTED)
    box(x + PW - 38, y + 26, x + PW - 12, y + 50, fill=SURFACE, outline=BORDER)
    t(x + PW - 33, y + 32, "MF", F(SR, 9), MUTED)
    hl(x, y + 58)
    box(x, y + 58, x + PW, y + 76, fill=SURFACE)
    t(x + 12, y + 61, "CONFIRMED MEETUP", F(MR, 6), ACCENT)
    t(x + 12, y + 70, "Tuesday, March 18 · 11 AM", F(MR, 7), TEXT)
    t(x + PW - 56, y + 68, "reschedule", F(MR, 6), MUTED)
    hl(x, y + 76)
    D.line([(x + 12, y + 90), (x + 72, y + 90)], fill=BORDER, width=1)
    t(x + 78, y + 85, "The Circle connected you.", F(MR, 6), MUTED)
    D.line([(x + 196, y + 90), (x + PW - 12, y + 90)], fill=BORDER, width=1)
    msgs = [
        ("MF", "Hey. Looking forward to Tuesday.", False),
        (None, "Same. Do you have a place in mind?", True),
        ("MF", "Cafe on Sunset. Low-key, no music.", False),
        (None, "Perfect. See you there.", True),
    ]
    my = y + 104
    mf = F(MR, 8)
    for sender, text, is_me in msgs:
        lines = wrap(text, mf, PW - 70)
        bh = max(26, len(lines) * 13 + 10)
        bw = min(int(max(D.textlength(l, font=mf) for l in lines)) + 16, PW - 60)
        if is_me:
            bx = x + PW - 12 - bw
            box(bx, my, bx + bw, my + bh, fill=TEXT)
            for j, l in enumerate(lines):
                t(bx + 6, my + 4 + j * 13, l, mf, BG)
        else:
            box(x + 12, my, x + 26, my + 18, fill=SURFACE, outline=BORDER)
            t(x + 14, my + 4, "MF", F(MR, 6), MUTED)
            bx = x + 32
            box(bx, my, bx + bw, my + bh, fill=SURFACE, outline=BORDER)
            for j, l in enumerate(lines):
                t(bx + 6, my + 4 + j * 13, l, mf, TEXT)
        my += bh + 8
    hl(x, y + PH - 50)
    box(x + 10, y + PH - 42, x + PW - 46, y + PH - 18, outline=BORDER)
    t(x + 16, y + PH - 36, "type something", F(MR, 8), MUTED)
    box(x + PW - 40, y + PH - 42, x + PW - 12, y + PH - 18, outline=TEXT)
    t(x + PW - 31, y + PH - 36, "→", F(MR, 9), TEXT)


# ─── NOTIFICATIONS ────────────────────────────────────────
def draw_notifications(x, y):
    frame(x, y)
    t(x + 14, y + 28, "← back", F(MR, 7), MUTED)
    nt = "Notifications"
    ntw = int(D.textlength(nt, font=F(SR, 13)))
    t(x + (PW - ntw) // 2, y + 27, nt, F(SR, 13), TEXT)
    t(x + PW - 64, y + 30, "MARK ALL READ", F(MR, 6), MUTED)
    hl(x, y + 48)
    box(x, y + 48, x + PW, y + 64, fill=SURFACE)
    t(x + 14, y + 53, "2 UNREAD", F(MR, 7), ACCENT)
    hl(x, y + 64)
    notifs = [
        ("⊙", "THE CIRCLE", "The Circle has a match for you.", "1h ago", True),
        ("◇", "EVENT", "Private screening — 3 spots left.", "3h ago", True),
        ("○", "COLLAB", "Valentina saved your collab post.", "5h ago", False),
        ("◉", "MEETUP", "Mia confirmed your meetup.", "1d ago", False),
        ("—", "SYSTEM", "Your application was approved.", "3d ago", False),
    ]
    ny = y + 64
    mf = F(MR, 8)
    for icon, typ, msg, time_str, unread in notifs:
        if ny + 52 > y + PH - 52:
            break
        if unread:
            box(x, ny, x + PW, ny + 52, fill=SURFACE)
        t(x + 14, ny + 10, icon, F(MR, 9), ACCENT if typ == "THE CIRCLE" else MUTED)
        t(x + 32, ny + 8, typ, F(MR, 6), MUTED)
        lines = wrap(msg, mf, PW - 52)
        for j, l in enumerate(lines):
            t(x + 32, ny + 18 + j * 12, l, mf, TEXT if unread else MUTED)
        t(x + 32, ny + 18 + len(lines) * 12 + 2, time_str, F(MR, 6), MUTED)
        if unread:
            box(x + PW - 18, ny + 10, x + PW - 12, ny + 16, fill=ACCENT)
        hl(x, ny + 51)
        ny += 52


# ─── RENDER ALL ───────────────────────────────────────────
drawers = [
    draw_splash, draw_onboarding, draw_apply,
    draw_feed, draw_events, draw_profile,
    draw_circle, draw_chat, draw_notifications,
]
labels = [
    "Splash", "Onboarding", "Apply",
    "Home Feed", "Events", "Profile",
    "The Circle", "Chat", "Notifications",
]

for i, (drawer, lbl) in enumerate(zip(drawers, labels)):
    col = i % COLS
    row = i // COLS
    px = PAD + col * (PW + GAP)
    py = PAD + 80 + row * (PH + GAP + 30)
    drawer(px, py)
    lf2 = F(MR, 8)
    lw2 = int(D.textlength(lbl.upper(), font=lf2))
    D.text((px + (PW - lw2) // 2, py + PH + 10), lbl.upper(), font=lf2, fill=MUTED)

out = "/home/user/scoremyiq/cult-screens.png"
canvas.save(out)
print(f"Saved: {out}  {os.path.getsize(out):,} bytes  {canvas.size}")
